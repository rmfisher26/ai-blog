'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { ThemeToggleContext } from './ThemeRegistry';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeToggleButton() {
  const { mode, toggleMode } = React.useContext(ThemeToggleContext);
  const theme = useTheme();

  return (
    <IconButton
      onClick={toggleMode}
      color="inherit"
      sx={{
        ml: 1,
        transition: 'all 0.3s ease',
        '&:hover': { transform: 'rotate(15deg)' },
      }}
      aria-label="toggle theme"
    >
      {mode === 'dark' ? <LightModeIcon sx={{color:"white"}}/> : <DarkModeIcon sx={{color:"black"}} />}
    </IconButton>
  );
}
