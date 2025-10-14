"use client";
import { useState } from "react";
import { Post } from "@prisma/client";

type SearchProps = {
  posts: Pick<Post, "id" | "title" | "slug">[]; // or just Post[] if you have all fields
};

export default function Search({ posts }: SearchProps) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Search posts..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filtered.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
