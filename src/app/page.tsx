
import AuthButton from "@/components/AuthButton";
import Search from "@/components/Search";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Typography, Button, Box } from '@mui/material';


export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (

    
    <main className="max-w-2xl mx-auto p-6">

      
      <AuthButton />
      <h1 className="text-3xl font-bold mb-6">🧠 AI Blog</h1>
      {<Search posts={posts} />}
      <br></br>

      <p>All Blogs</p>
      <br></br>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
      <p>Number of Blogs:{posts.length}</p>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Prisma + MUI + Vercel App 🚀
        </Typography>
        <Typography variant="body1" gutterBottom>
          This app is styled with Material UI and deployed on Vercel.
        </Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
          Explore Posts
        </Button>
      </Box>
    </main>
  );
}
