import prisma from "@/lib/prisma";

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

export async function GET() {
  const posts = await prisma.post.findMany();

  return Response.json({ message: "ok", status: 200, data: posts });
}

export async function POST(req: Request) {
  const body = await req.json();

  const post = await prisma.post.create({
    data: {
      ...body,
    },
  });

  if (!post)
    return Response.json({
      message: "Error while creating post",
      status: 500,
    });

  return Response.json({ message: "ok", status: 200, data: post });
}
