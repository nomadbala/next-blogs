import prisma from "@/lib/prisma";

export async function GET() {
    const posts = await prisma.post.findMany();

    return Response.json({ message: 'ok', status: 200, data: posts });
}

export async function POST(req: Request) {
    const body = await req.json();

    const post = await prisma.post.create({
        data: {
            ...body
        }
    })

    if (!post) return Response.json({
        message: 'Error while creating post',
        status: 500
    })

    return Response.json({ message: 'ok', status: 200, data: post })
}