import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/data/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hassanmehmood.dev"),
  title: `${siteConfig.name} | Senior Software Developer`,
  description: `${siteConfig.headline}. ${siteConfig.subline}`,
  keywords: [
    "Hafiz Hassan Mehmood",
    "TechNest Nova",
    "Senior Software Developer",
    "Java",
    "Spring Boot",
    "Flutter",
    "Next.js",
    "Backend Developer",
    "Mobile Developer",
    "Bahawalpur",
    "Pakistan",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.gitHub }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hassanmehmood.dev",
    title: `${siteConfig.name} | Senior Software Developer at TechNest Nova`,
    description: siteConfig.subline,
    siteName: siteConfig.name,
    images: [
      {
        url: "/profile/hassan.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Senior Software Developer`,
    description: siteConfig.subline,
    images: ["/profile/hassan.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--bg-deep)] text-[var(--text-primary)] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
