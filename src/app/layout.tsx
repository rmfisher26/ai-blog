'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react'
import { Analytics } from "@vercel/analytics/react";


import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { theme } from '@/lib/theme';
import Navbar from '@/components/NavBar';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <SessionProvider>{children}</SessionProvider>
            <Analytics />
          </Container>
        </ThemeProvider>


      </body>
    </html>
  );
}
