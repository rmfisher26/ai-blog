import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import matter from "gray-matter";

function parseMarkdown(raw: string) {
  // remove ```markdown and ending ``` if present
  const cleaned = raw
    .replace(/^```markdown\s*/, '')
    .replace(/```$/, '')
    .trim()

  return matter(cleaned)
}

export async function POST(req: Request) {
  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Missing topic" }, { status: 400 });
  }

  // 🔹 Call OpenAI or similar API
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `
  Write a detailed markdown blog post about "${topic}".
  Include frontmatter with title, date, and tags.
  Use a friendly and informative tone.
  `;

  const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    }),
  });

  const aiData = await aiResponse.json();
  const rawContents = aiData.choices?.[0]?.message?.content;
  
  if (!rawContents) return NextResponse.json({ error: "No content" }, { status: 500 });
  
  const parsedMarkdown = parseMarkdown(rawContents)
  const { data, content } = matter(parsedMarkdown);

  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const tags = Array.isArray(data.tags) ? data.tags.join(',') : '' // ✅ store as string

  const post = await prisma.post.create({
    data: { 
      title: data.title, 
      slug, 
      content:content.trim(), //no markdown fences
      tags: tags },
  });

  return NextResponse.json({ message: "Post created", post });
}


