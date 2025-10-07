# 🧠 Next.js + Generative AI Blog (30-Day Build Plan)

> Build a **modern Next.js blog** that uses **AI to write, edit, and manage posts automatically** — in just 30 days.  
> Powered by **Next.js 14**, **OpenAI**, **Prisma**, and **Tailwind CSS**.

---

## 📅 Progress Tracker

| Day | Task | Status |
|-----|------|--------|
| 1 | 🛠️ Initialize project: `npx create-next-app@latest ai-blog` | ☐ |
| 2 | 🎨 Add Tailwind CSS & base layout | ☐ |
| 3 | 📁 Create `/posts` route with dynamic `[slug].tsx` | ☐ |
| 4 | 📝 Add markdown support with `gray-matter` + `remark` | ☐ |
| 5 | 📚 Build blog list page | ☐ |
| 6 | 🗂️ Add frontmatter metadata (title, date, tags) | ☐ |
| 7 | 💅 Style and polish layout | ☐ |
| 8 | ⚙️ Create `/api/generate` route | ☐ |
| 9 | 🤖 Connect OpenAI / Hugging Face API | ☐ |
| 10 | 🧩 Build topic input form | ☐ |
| 11 | 💬 Display AI-generated draft | ☐ |
| 12 | ✍️ Convert AI output to markdown preview | ☐ |
| 13 | 🔁 Add regenerate & edit features | ☐ |
| 14 | 💾 Save drafts to `/content/drafts` | ☐ |
| 15 | 🧱 Set up Prisma + SQLite | ☐ |
| 16 | 🧩 Define `Post` model | ☐ |
| 17 | 🚀 Create CRUD API endpoints | ☐ |
| 18 | 🧠 Save AI posts into DB | ☐ |
| 19 | 🌐 Render posts dynamically | ☐ |
| 20 | 🔍 Add search and filter | ☐ |
| 21 | 🔐 Add authentication (NextAuth.js / Clerk) | ☐ |
| 22 | 🧰 Build admin dashboard | ☐ |
| 23 | 🖼️ Add AI-generated thumbnails | ☐ |
| 24 | 🚦 Add SEO metadata | ☐ |
| 25 | 💬 Add markdown editor with preview | ☐ |
| 26 | 🗂️ Add categories and related posts | ☐ |
| 27 | ☁️ Deploy to Vercel | ☐ |
| 28 | 📊 Add analytics | ☐ |
| 29 | 💭 Add comments system (Giscus / Supabase) | ☐ |
| 30 | 🌟 Final polish + demo + README | ☐ |

---

## 🧱 Folder Structure

ai-blog/
├─ app/
│ ├─ api/
│ │ ├─ generate/route.ts
│ │ └─ posts/route.ts
│ ├─ posts/
│ │ └─ [slug]/page.tsx
│ ├─ layout.tsx
│ └─ page.tsx
├─ components/
│ ├─ PostCard.tsx
│ ├─ Editor.tsx
│ └─ Navbar.tsx
├─ content/
│ ├─ posts/
│ └─ drafts/
├─ prisma/
│ └─ schema.prisma
├─ public/
│ └─ images/
├─ styles/
│ └─ globals.css
├─ .env.local
└─ README.md


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

