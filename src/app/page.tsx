
import AuthButton from "@/components/AuthButton";
import Search from "@/components/Search";
import { prisma } from "@/lib/prisma";
import {
  Typography,
  Box,
  Grid
} from "@mui/material";
import PostCard, { Post } from '@/components/PostCard';
import MainFeaturedPost from '@/components/MainFeaturedPost';
import FeaturedPost from '@/components/FeaturedPost';
import BlogFooter from '@/components/FooterContent';
import MainContent from "@/components/MainContent";
import FooterContent from "@/components/FooterContent";
import LatestContent from "@/components/LatestContent";



export default async function HomePage() {
  const posts: Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  const mainFeaturedPost = {
    title: posts[0]?.title || 'Welcome to AI Blog',
    description:
      posts[0]?.content.slice(0, 150) ||
      'Explore AI-generated posts built with Next.js, Prisma, and Material UI.',
    image: posts[0]?.coverImageUrl || '/images/placeholder.png',
    slug: posts[0]?.slug || '',
  };

  const mainFeaturedPost2 = {
    title: posts[1]?.title || 'Welcome to AI Blog',
    description:
      posts[1]?.content.slice(0, 100) ||
      'Explore AI-generated posts built with Next.js, Prisma, and Material UI.',
    image: posts[1]?.coverImageUrl || '/images/placeholder.png',
    slug: posts[1]?.slug || '',
  };


  const featuredPosts = posts.slice(2, 4).map((post) => ({
    title: post.title,
    date: new Date(post.createdAt).toLocaleDateString(),
    description: post.content.slice(0, 120) + '...',
    image: post.coverImageUrl || '/images/placeholder.png',
    imageLabel: post.title,
    slug: post.slug,
  }));

  return (
    <main>
      {/*<AuthButton />*/}


      <MainContent />
      <LatestContent />
      <FooterContent />
      {<Search posts={posts} />}
    </main>
  );
}
