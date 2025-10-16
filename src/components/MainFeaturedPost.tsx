'use client';

import { Box, Typography, Grid, Paper } from '@mui/material';
import Link from 'next/link';

interface MainFeaturedPostProps {
  post: {
    title: string;
    description: string;
    image: string;
    slug: string;
  };
}

export default function MainFeaturedPost({ post }: MainFeaturedPostProps) {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Link href={`/posts/${post.slug}`} style={{ color: '#fff' }}>
              Continue reading...
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
