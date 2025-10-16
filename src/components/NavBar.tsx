// components/Navbar.tsx
'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ThemeToggleButton from './ThemeToggleButton';
import Image from 'next/image'

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" href="/" sx={{ mr: 2 }}>
            
             <Image
                  src={"/images/logo.png"}
                  width={50}
                  height={50}
                  alt={""}
                />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Doppelgamers
          </Typography>
             <Box>
          <ThemeToggleButton />
        </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
