import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL } from "@/lib/contact";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "midi8",
  url: siteUrl,
  logo: `${siteUrl}/midi8-brand-logo.webp`,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  description:
    "Estúdio de tecnologia, software, automação, inteligência artificial e marketing digital para empresas.",
  areaServed: "PT",
  sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
};

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: "midi8",
  icons: {
    icon: [
      { url: "/favicon-8-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-8-64.png", type: "image/png", sizes: "64x64" },
      { url: "/favicon-8-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: [{ url: "/favicon-8-64.png", type: "image/png" }],
    apple: [
      { url: "/favicon-8-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  description:
    "Web Design, Desenvolvimento de Software e Mobile, Automação de Processos, IA & LLMs, Análise de Dados, E-commerce e Estratégia Digital.",
  keywords: [
    "web design",
    "desenvolvimento web",
    "desenvolvimento de software",
    "automação de processos",
    "inteligência artificial",
    "marketing digital",
    "consultoria informática",
    "e-commerce",
    "desenvolvimento mobile",
    "midi8",
  ],
  authors: [{ name: "midi8" }],
  openGraph: {
    title: "midi8",
    siteName: "midi8",
    url: siteUrl,
    description:
      "Web Design, Software, Automação, IA, Marketing Digital e Consultoria num único parceiro.",
    type: "website",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "midi8",
    description:
      "Web Design, Software, Automação, IA, Marketing Digital e Consultoria num único parceiro.",
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
      className={`${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-normal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider>
          <MotionProvider>
            <SmoothScroll />
            <Navbar />
            {children}
            <Footer />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
