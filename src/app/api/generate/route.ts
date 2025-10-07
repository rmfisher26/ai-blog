import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

  const data = await aiResponse.json();
  const markdown = data.choices?.[0]?.message?.content;

  if (!markdown) {
    return NextResponse.json({ error: "No content generated" }, { status: 500 });
  }

  // 🔹 Save markdown file
  const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  fs.writeFileSync(filePath, markdown, "utf8");

  return NextResponse.json({ message: "Post created", slug });
}
