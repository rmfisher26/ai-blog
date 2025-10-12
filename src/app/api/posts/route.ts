import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { title, content, tags } = await req.json();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const post = await prisma.post.create({
    data: { title, slug, content, tags },
  });
  return NextResponse.json(post);
}


export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}
