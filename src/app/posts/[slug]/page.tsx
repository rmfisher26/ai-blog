import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, content: true },
  });

  if (!post) {
    return {
      title: "Post not found | AI Blog",
      description: "This post could not be found.",
    };
  }

  return {
    title: `${post.title} | AI Blog`,
    description: post.content.slice(0, 160),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) return <div>Post not found</div>;

  return (
    <article className="prose mx-auto p-6">
      <h1>{post.title}</h1>
      <p className="text-gray-300 text-sm">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <Image
        src={post.coverImageUrl || "/images/placeholder.png"}
        width={512}
        height={512}
        alt={post.coverImageAlt || ""}
      />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
