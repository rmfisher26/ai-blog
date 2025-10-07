
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <a
              href={`/posts/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.frontmatter.title}
            </a>
            <p className="text-gray-500 text-sm">
              {
              new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
