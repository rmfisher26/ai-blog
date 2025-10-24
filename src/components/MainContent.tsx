'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { useEffect, useState } from "react";
import type { Post } from "@prisma/client";
import Link from 'next/link';
import { formatCustomDate } from '@/lib/utilities';


const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});


type AuthorType = {
  name: string;
  avatar: string;
  date: Date;
};

export function Author({ authors }: { authors: AuthorType[] }) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name || 'AI'}
              src={author.avatar || '/images/logo.png'}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">
        {authors.map((author) => author.date).join(', ')}
      </Typography>
    </Box>
  );
}



export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const [postCardData, setPostCardData] = useState<Post[]>([]);

  //use localStorage to keep data from refreshing (basic approach)
  //could be improved with Next.JS ISR?
  useEffect(() => {
    const cached = localStorage.getItem("posts");

    if (cached) {
      setPostCardData(JSON.parse(cached));
    } else {
      fetch("/api/posts")
        .then((res) => res.json())
        .then((data: Post[]) => {
          setPostCardData(data);
          localStorage.setItem("posts", JSON.stringify(data)); // 💾 Cache it
        })
        .catch((err) => console.error("Failed to fetch posts:", err));
    }
  }, []);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  const handleCardClick = () => {
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h2" gutterBottom>
          Blog
        </Typography>
        <Typography>Stay in the loop with the latest about our products</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip onClick={handleClick} size="medium" label="All categories" />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Company"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Product"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Design"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Engineering"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Link href={`/posts/${postCardData[0]?.slug}`} style={{ textDecoration: "none" }}>
            <StyledCard
              variant="outlined"
              onFocus={() => handleFocus(0)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
            >

              <CardMedia
                component="img"
                alt={postCardData[0]?.coverImageAlt ?? "Blog post image"}
                image={
                  typeof postCardData[0]?.coverImageUrl === "string"
                    ? postCardData[0]!.coverImageUrl
                    : "/images/placeholder.png"
                } sx={{
                  aspectRatio: '16 / 9',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {postCardData[0]?.tags || 'Loading Tags...'}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {postCardData[0]?.title || 'Loading Title...'}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {postCardData[0]?.content || 'Loading Content...'}
                </StyledTypography>
              </StyledCardContent>
              <Author authors={[{ name: postCardData[0]?.author || '...', avatar: '/images/avatar.png', date: postCardData[0]?.createdAt || ""}]} />
            </StyledCard>
          </Link>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Link href={`/posts/${postCardData[1]?.slug}`} style={{ textDecoration: "none" }}>
            <StyledCard
              variant="outlined"
              onFocus={() => handleFocus(1)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
            >
              <CardMedia
                component="img"
                alt={postCardData[1]?.coverImageAlt ?? "Blog post image"}
                image={
                  typeof postCardData[1]?.coverImageUrl === "string"
                    ? postCardData[1]!.coverImageUrl
                    : "/images/placeholder.png"
                } sx={{
                  aspectRatio: '16 / 9',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {postCardData[1]?.tags || 'Loading Tags...'}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {postCardData[1]?.title || 'Loading Title...'}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {postCardData[1]?.content || 'Loading Content...'}
                </StyledTypography>
              </StyledCardContent>
              <Author authors={[{ name: postCardData[1]?.author || '...', avatar: '/images/avatar.png', date: (postCardData[1]?.createdAt) || '...'}]} />
            </StyledCard>
          </Link>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Link href={`/posts/${postCardData[2]?.slug}`} style={{ textDecoration: "none" }}>

            <StyledCard
              variant="outlined"
              onFocus={() => handleFocus(2)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >

              <CardMedia
                component="img"
                alt={postCardData[2]?.coverImageAlt ?? "Blog post image"}
                image={
                  typeof postCardData[2]?.coverImageUrl === "string"
                    ? postCardData[2]!.coverImageUrl
                    : "/images/placeholder.png"
                } sx={{
                  aspectRatio: '16 / 9',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {postCardData[2]?.tags || 'Loading Tags...'}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {postCardData[2]?.title || 'Loading Title...'}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {postCardData[2]?.content || 'Loading Content...'}
                </StyledTypography>
              </StyledCardContent>
              <Author authors={[{ name: postCardData[2]?.author || '...', avatar: '/images/avatar.png', date: (postCardData[2]?.createdAt) || '...'}]} />
            </StyledCard>
          </Link>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
          >
            <Link href={`/posts/${postCardData[3]?.slug}`} style={{ textDecoration: "none" }}>

              <StyledCard
                variant="outlined"
                onFocus={() => handleFocus(3)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
                sx={{ height: '100%' }}
              >

                <StyledCardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div>
                    <Typography gutterBottom variant="caption" component="div">
                      {postCardData[3]?.tags || 'Loading Tags...'}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {postCardData[3]?.title || 'Loading Title...'}
                    </Typography>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {postCardData[3]?.content || 'Loading Content...'}
                    </StyledTypography>
                  </div>
                </StyledCardContent>
              <Author authors={[{ name: postCardData[3]?.author || '...', avatar: '/images/avatar.png', date: (postCardData[3]?.createdAt) || '...'}]} />
              </StyledCard>
            </Link>
            <Link href={`/posts/${postCardData[4]?.slug}`} style={{ textDecoration: "none" }}>
              <StyledCard
                variant="outlined"
                onFocus={() => handleFocus(4)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
                sx={{ height: '100%' }}
              >
                <StyledCardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div>
                    <Typography gutterBottom variant="caption" component="div">
                      {postCardData[4]?.tags || 'Loading Tags...'}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {postCardData[4]?.title || 'Loading Title...'}
                    </Typography>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {postCardData[4]?.content || 'Loading Content...'}
                    </StyledTypography>
                  </div>
                </StyledCardContent>
              <Author authors={[{ name: postCardData[4]?.author || '...', avatar: '/images/avatar.png', date: (postCardData[4]?.createdAt) || '...'}]} />
              </StyledCard>
            </Link>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Link href={`/posts/${postCardData[5]?.slug}`} style={{ textDecoration: "none" }}>

            <StyledCard
              variant="outlined"
              onFocus={() => handleFocus(5)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
              sx={{ height: '100%' }}
            >

              <CardMedia
                component="img"
                alt={postCardData[5]?.coverImageAlt ?? "Blog post image"}
                image={
                  typeof postCardData[5]?.coverImageUrl === "string"
                    ? postCardData[5]!.coverImageUrl
                    : "/images/placeholder.png"
                }
                sx={{
                  height: { sm: 'auto', md: '50%' },
                  aspectRatio: { sm: '16 / 9', md: '' },
                }}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {postCardData[5]?.tags || 'Loading Tags...'}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {postCardData[5]?.title || 'Loading Title...'}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {postCardData[5]?.content || 'Loading Content...'}
                </StyledTypography>
              </StyledCardContent>
              <Author authors={[{ name: postCardData[5]?.author || '...', avatar: '/images/avatar.png', date: (postCardData[5]?.createdAt) || '...'}]} />
            </StyledCard>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
