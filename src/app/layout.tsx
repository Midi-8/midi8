import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL } from "@/lib/contact";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Midi8",
  url: siteUrl,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  description:
    "Estúdio de tecnologia, software, automação, inteligência artificial e marketing digital para empresas.",
  areaServed: "PT",
  sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
};

const ornateSerif = Cormorant_Garamond({
  variable: "--font-ornate",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Midi8 — Tecnologia, Software, Automação & Comunicação Digital",
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
    "Midi8",
  ],
  authors: [{ name: "Midi8" }],
  openGraph: {
    title: "Midi8 — Tecnologia, Software & Comunicação Digital",
    description:
      "Web Design, Software, Automação, IA, Marketing Digital e Consultoria num único parceiro.",
    type: "website",
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Midi8 — Tecnologia, Software & Comunicação Digital",
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
      className={`${ornateSerif.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.className} min-h-full flex flex-col bg-background text-foreground font-normal`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LanguageProvider>
          <MotionProvider>
            <Navbar />
            {children}
            <Footer />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
