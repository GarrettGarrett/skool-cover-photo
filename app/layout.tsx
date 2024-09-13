import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Skool Cover Photo Builder',
  description: 'Create a custom cover photo for your Skool community',
  openGraph: {
    title: 'Skool Cover Photo Builder',
    description: 'Create a custom cover photo for your Skool community',
    images: [
      {
        url: 'https://skool-cover-photo.vercel.app//og-image.png',
        width: 1200,
        height: 630,
        alt: 'Skool Cover Photo Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skool Cover Photo Builder',
    description: 'Create a custom cover photo for your Skool community',
    images: ['https://skool-cover-photo.vercel.app/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
