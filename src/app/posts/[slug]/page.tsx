import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";


interface PostPageProps {
  params: Promise<{ slug: string }> // 👈 note: params is now async
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });


  if (!post) return <div>Post not found</div>;

  return (
    <article className="prose mx-auto p-6">
      <h1>{post.title}</h1>
      <p className="text-gray-500 text-sm">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <ReactMarkdown>{(post.content)}</ReactMarkdown>
    </article>
  );
}