'use client';

import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { PaletteMode } from '@mui/material';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  // Load saved mode on first render
  React.useEffect(() => {
    const saved = localStorage.getItem('theme-mode') as PaletteMode;
    if (saved) setMode(saved);
  }, []);

  // Save mode whenever it changes
  React.useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#1976d2' },
                secondary: { main: '#9c27b0' },
                background: { default: '#fafafa', paper: '#fff' },
              }
            : {
                primary: { main: '#90caf9' },
                secondary: { main: '#ce93d8' },
                background: { default: '#121212', paper: '#1e1e1e' },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggleContext.Provider value={{ mode, toggleMode }}>
        {children}
      </ThemeToggleContext.Provider>
    </ThemeProvider>
  );
}

// 👇 Context for use in any component
export const ThemeToggleContext = React.createContext({
  mode: 'light' as PaletteMode,
  toggleMode: () => {},
});
