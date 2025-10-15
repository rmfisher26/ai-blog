'use client';

import Link from 'next/link';
import { Card, CardContent, CardActions, CardMedia, Typography, Button } from '@mui/material';
import placeholder from '@/images/placeholder.png'

export type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  author?: string | null;
  tags?: string | null;          // comma-separated string
  createdAt: Date;
  updatedAt: Date;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
};

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 3,
        transition: 'transform 0.2s ease, boxShadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      {/* Optional Card Image */}
      {post.coverImageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={placeholder.src /*post.coverImageUrl*/}
          alt={post.title}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component={Link}
          href={`/posts/${post.slug}`}
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {post.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Typography>

        {post.author && (
          <Typography variant="body2" color="text.secondary">
            By {post.author}
          </Typography>
        )}
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
  );
}
