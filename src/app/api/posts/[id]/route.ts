import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

function validatePost(title: string, content: string) {
  const errors: string[] = [];

  if (!title || title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long");
  }

  if (!content || content.trim().length < 10) {
    errors.push("Content must be at least 10 characters long");
  }

  return errors;
}

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found", status: 404 });
  }

  return NextResponse.json({ message: "ok", status: 200, data: post });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const thumbnailFile = formData.get("thumbnail") as File | null;

    const errors = validatePost(title, content);
    if (errors.length > 0) {
      return NextResponse.json({
        message: "Validation failed",
        errors,
        status: 400,
      });
    }

    let thumbnailPath = undefined;
    if (thumbnailFile) {
      thumbnailPath = `/uploads/${Date.now()}-${thumbnailFile.name}`;
      const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
      const fs = require("fs");
      fs.writeFileSync(`./public${thumbnailPath}`, buffer);
    }

    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        title,
        content,
        ...(thumbnailPath && { thumbnail: thumbnailPath }),
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found", status: 404 });
    }

    return NextResponse.json({ message: "ok", status: 200, data: post });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({
      message: "Error while updating post",
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const post = await prisma.post.delete({
    where: { id: params.id },
  });

  if (!post) {
    return NextResponse.json({
      message: "Error while deleting post",
      status: 500,
    });
  }

  return NextResponse.json({ message: "ok", status: 200 });
}
