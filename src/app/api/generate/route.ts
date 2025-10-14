import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import matter from "gray-matter";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

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
  Include valid YAML frontmatter with fields:
    - title
    - date (YYYY-MM-DD)
    - tags
    - description
    - coverImagePrompt (visual scene description)
    - coverImageAlt
  Use a friendly and informative tone.
  Content should not include code fences around the entire markdown.
  `;

  // 🖼️ Generate image using gpt-image-1
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
  const author = "Robert"



  // 🖼️ Generate image using gpt-image-1
  let imageUrl = null;
  if (data.coverImagePrompt) {
    try {
      const image = await openai.images.generate({
        model: "gpt-image-1",
        prompt: data.coverImagePrompt,
        size: "1024x1024",
      });
      // ✅ Safe access to image URL
      imageUrl = image.data?.[0]?.url ?? null;
    } catch (err) {
      console.error("Image generation failed:", err);
      imageUrl = "/placeholder.jpg"
    }
  }

  // 💾 Save to Prisma
  const post = await prisma.post.create({
    data: {
      title: data.title || topic,
      slug,
      content: content.trim(),
      tags,
      author,
      coverImageUrl: imageUrl,
      coverImageAlt: data.coverImageAlt || data.title,
    },
  });
  console.log(post)

  return NextResponse.json({ message: "Post created", post });
}


