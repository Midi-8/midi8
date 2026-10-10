import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
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
  title: "Midi8 — Engenharia de Software & Soluções Digitais de Alto Nível",
  description:
    "Transformamos operações complexas em sistemas digitais elegantes. Desenvolvimento Web, Automação, IA, Apps Móveis e Consultoria Técnica de suporte à decisão.",
  keywords: [
    "engenharia de software",
    "desenvolvimento web",
    "automação",
    "inteligência artificial",
    "consultoria técnica",
    "Next.js",
    "React",
    "aplicações móveis",
    "Midi8",
  ],
  authors: [{ name: "Midi8" }],
  openGraph: {
    title: "Midi8 — Engenharia de Software & Soluções Digitais",
    description:
      "Transformamos operações complexas em sistemas digitais elegantes.",
    type: "website",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midi8 — Engenharia de Software & Soluções Digitais",
    description:
      "Transformamos operações complexas em sistemas digitais elegantes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950">
        {/* Navbar lives in the root layout so it persists across all routes */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
