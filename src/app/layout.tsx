import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Analytics } from "@/components/shared/analytics";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/shared/json-ld";

import { siteMetadata } from "@/lib/data/site";

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
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    url: siteMetadata.url,
    siteName: siteMetadata.title,
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  alternates: {
    canonical: "/",
  },
  // 直接リンク配布での運用のため、検索エンジンにはインデックスさせない。
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <PersonJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="bg-grid flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
