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

  const featuredPosts = posts.slice(1, 3).map((post) => ({
    title: post.title,
    date: new Date(post.createdAt).toLocaleDateString(),
    description: post.content.slice(0, 120) + '...',
    image: post.coverImageUrl || '/images/placeholder.png',
    imageLabel: post.title,
    slug: post.slug,
  }));



  return (
    <main className="max-w-5xl mx-auto p-6">
      {/*<AuthButton />*/}

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        AI Blog
      </Typography>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <Grid key={post.title} >
            <FeaturedPost post={post} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        All Blogs
      </Typography>
      {<Search posts={posts} />}


      {/* Blog Post Cards */}
      {/*
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
*/}
      <Typography variant="body1" sx={{ mt: 3 }}>
        Number of Blogs: {posts.length}
      </Typography>

      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="body1" gutterBottom>
          This app is styled with Material UI and deployed on Vercel.
        </Typography>

      </Box>
    </main>
  );
}
