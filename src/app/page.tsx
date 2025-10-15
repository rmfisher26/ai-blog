import AuthButton from "@/components/AuthButton";
import Search from "@/components/Search";
import { prisma } from "@/lib/prisma";
import {
  Typography,
  Box,
  Grid
} from "@mui/material";
import PostCard, { Post } from '@/components/PostCard';


export default async function HomePage() {
  const posts: Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/*<AuthButton />*/}

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        AI Blog
      </Typography>

      {<Search posts={posts} />}

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        All Blogs
      </Typography>

      {/* Blog Post Cards */}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>

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
