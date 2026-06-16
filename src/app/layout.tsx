import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BLOG | Share Your Stories",
  description: "A beautiful blogging platform to share your thoughts, stories, and ideas. Read interesting articles and connect with writers.",
  keywords: "blog, articles, stories, writing, community",
  authors: [{ name: "Meet5" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meet5-fe-w4ca.vercel.app",
    siteName: "BLOG",
    description: "Share your thoughts and stories with the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLOG",
    description: "A platform for sharing your stories and ideas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
