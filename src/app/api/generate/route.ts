/*
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { topic } = await req.json();
  const prompt = `Write a detailed blog post about ${topic}`;
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });
  return NextResponse.json({ content: res.choices[0].message.content });
}
*/