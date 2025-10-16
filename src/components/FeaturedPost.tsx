'use client';

import { Card, CardMedia, CardContent, Typography, CardActionArea,Button } from '@mui/material';
import Link from 'next/link';

interface FeaturedPostProps {
  post: {
    title: string;
    date: string;
    description: string;
    image: string;
    imageLabel: string;
    slug: string;
  };
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <CardActionArea component={Link} href={`/posts/${post.slug}`}>
      <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.date}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.description}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Read more
          </Typography>
          
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 270, display: { xs: 'none', sm: 'block' } }}
          image={post.image}
          alt={post.imageLabel}
        />
        
      </Card>
    </CardActionArea>
  );
}
