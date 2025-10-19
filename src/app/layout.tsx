'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react'
import { Analytics } from "@vercel/analytics/react";
import * as React from 'react';
import Container from '@mui/material/Container';
import ThemeRegistry from '@/components/ThemeRegistry';
import AppNavBar from "@/components/AppNavBar";

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
      > <ThemeRegistry>
          <AppNavBar/>
          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
          >
            <SessionProvider>{children}</SessionProvider>
            <Analytics />
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
