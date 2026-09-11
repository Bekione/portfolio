import type { Metadata } from "next";
import Script from "next/script";
import {
  Instrument_Sans,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://bereketkinfe.com"),
  ),
  title: "Bereket Kinfe — Software Engineer",
  description:
    "Software engineer building thoughtful web, mobile, and AI-powered systems from Addis Ababa, Ethiopia.",
  keywords: [
    "Bereket Kinfe",
    "Software Engineer",
    "Full-Stack Developer",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Addis Ababa",
  ],
  authors: [{ name: "Bereket Kinfe" }],
  creator: "Bereket Kinfe",
  openGraph: {
    title: "Bereket Kinfe — Software Engineer",
    description:
      "Software engineer building thoughtful web, mobile, and AI-powered systems from Addis Ababa, Ethiopia.",
    type: "website",
    locale: "en_US",
    url: "https://github.com/Bekione",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bereket Kinfe — Software Engineer",
    description:
      "Software engineer building thoughtful web, mobile, and AI-powered systems from Addis Ababa, Ethiopia.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bereket Kinfe",
    jobTitle: "Software Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Addis Ababa",
      addressCountry: "Ethiopia",
    },
    url: "https://github.com/Bekione",
    sameAs: [
      "https://github.com/Bekione",
      "https://www.linkedin.com/in/bereket-k/",
    ],
    knowsAbout: [
      "Frontend Engineering",
      "Full-Stack Development",
      "TypeScript",
      "React",
      "Next.js",
      "System Architecture",
      "Performance Optimization",
    ],
  };

  return (
    <html
      lang="en"
      className={`scroll-smooth ${instrumentSans.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Synchronous blocking script to prevent theme flash (FOUC) on refresh */}
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bk_theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else if(t==='light'){document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased selection:bg-vermilion selection:text-white">
        {children}
      </body>
    </html>
  );
}
