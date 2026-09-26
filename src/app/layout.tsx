import type { Metadata } from "next";
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
  metadataBase: new URL("https://bereketkinfe.pro.et"),
  title: "Bereket Kinfe | Software Engineer",
  description:
    "Software engineer building thoughtful web, mobile, and AI-powered systems from Addis Ababa, Ethiopia.",
  alternates: {
    canonical: "https://bereketkinfe.pro.et",
  },
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
  authors: [{ name: "Bereket Kinfe", url: "https://bereketkinfe.pro.et" }],
  creator: "Bereket Kinfe",
  openGraph: {
    title: "Bereket Kinfe — Software Engineer",
    description:
      "Software engineer building thoughtful web, mobile, and AI-powered systems from Addis Ababa, Ethiopia.",
    type: "website",
    locale: "en_US",
    url: "https://bereketkinfe.pro.et",
    siteName: "Bereket Kinfe",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Bereket Kinfe — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bereket Kinfe — Software Engineer",
    description:
      "Software engineer building thoughtful web, mobile, and AI-powered systems from Addis Ababa, Ethiopia.",
    images: ["/og.png"],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://bereketkinfe.pro.et/#website",
        url: "https://bereketkinfe.pro.et/",
        name: "Bereket Kinfe",
        alternateName: [
          "Bereket Kinfe | Software Engineer",
          "Bekione",
        ],
        inLanguage: "en-US",
        publisher: {
          "@id": "https://bereketkinfe.pro.et/#person",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://bereketkinfe.pro.et/#profile",
        url: "https://bereketkinfe.pro.et/",
        name: "Bereket Kinfe | Software Engineer",
        primaryImageOfPage: {
          "@type": "ImageObject",
          "@id": "https://bereketkinfe.pro.et/#avatar",
          url: "https://bereketkinfe.pro.et/assets/avatar.png",
          caption: "Bereket Kinfe",
        },
        mainEntity: {
          "@id": "https://bereketkinfe.pro.et/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://bereketkinfe.pro.et/#person",
        name: "Bereket Kinfe",
        alternateName: "Bekione",
        jobTitle: "Software Engineer",
        description:
          "Software engineer building thoughtful web, mobile, and AI-powered systems from Addis Ababa, Ethiopia.",
        url: "https://bereketkinfe.pro.et/",
        image: "https://bereketkinfe.pro.et/assets/avatar.png",
        email: "mailto:bereket.kinfe23@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Addis Ababa",
          addressCountry: "ET",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Debre Berhan University",
        },
        sameAs: [
          "https://github.com/Bekione",
          "https://www.linkedin.com/in/bereket-k/",
          "https://www.upwork.com/freelancers/~012d26bbc748699f75",
        ],
        knowsAbout: [
          "Software Engineering",
          "Frontend Engineering",
          "Full-Stack Development",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "System Architecture",
          "Performance Optimization",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`dark ${instrumentSans.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Truly blocking inline script — runs before first paint to prevent FOUC */}
        <script
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
