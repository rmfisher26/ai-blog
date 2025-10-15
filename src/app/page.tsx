import AuthButton from "@/components/AuthButton";
import Search from "@/components/Search";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
} from "@mui/material";
import placeholder from '@/images/placeholder.png'

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl mx-auto p-6">
      <AuthButton />

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        AI Blog
      </Typography>

      <Search posts={posts} />

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        All Blogs
      </Typography>

      {/* Blog Post Cards */}
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              {/* Card Image */}

              <CardMedia
                component="img"
                image={placeholder.src}
                alt={post.title}
              />

              <CardContent>
                <Typography
                  variant="h6"
                  component={Link}
                  href={`/posts/${post.slug}`}
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  href={`/posts/${post.slug}`}
                  variant="outlined"
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
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
