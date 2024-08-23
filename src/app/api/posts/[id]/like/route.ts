import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  const post = await prisma.post.update({
    where: { id: params.id },
    data: { likes: { increment: 1 } },
  });

  if (!post) {
    return NextResponse.json({
      message: "Error while liking post",
      status: 500,
    });
  }

  return NextResponse.json({ message: "ok", status: 200, data: post });
}
