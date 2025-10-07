import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.md$/, "") }));
}

export default async function PostPage({ params }: 
  { params: Promise<{ slug: string }> }) {
    
  const routeParams = await params;

  const post = await getPostBySlug(routeParams.slug);
 
  //format date
  const dateObject = new Date(post.frontmatter.date);
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="prose mx-auto p-6">
      <h1>{post.frontmatter.title}</h1>
      <p className="text-gray-500">{formattedDate}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
