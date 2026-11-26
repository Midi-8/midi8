"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import KineticHeading from "@/components/KineticHeading";
import PillarCard3D from "@/components/PillarCard3D";
import ServicesCarousel from "@/components/ServicesCarousel";
import TeamSection from "@/components/TeamSection";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL } from "@/lib/contact";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

const PILLARS = {
  pt: [
    {
      accentHex: "#A818FF",
      accentRgb: "168, 24, 255",
      variant: "layers",
      title: "Engenharia & Produto",
      description: "Websites, plataformas web, software à medida e aplicações móveis.",
      tags: [
        { label: "Web & Plataformas", category: "web-software" },
        { label: "Software", category: "web-software" },
        { label: "Mobile", category: "web-software" },
      ],
    },
    {
      accentHex: "#145EFF",
      accentRgb: "20, 94, 255",
      variant: "orbit",
      title: "Automação, IA & Dados",
      description: "Integração de sistemas, automação de processos, IA e dados.",
      tags: [
        { label: "Automação", category: "ia-automacao" },
        { label: "LLMs & IA", category: "ia-automacao" },
        { label: "Dados", category: "ia-automacao" },
      ],
    },
    {
      accentHex: "#00C885",
      accentRgb: "0, 200, 133",
      variant: "prism",
      title: "Comunicação & Crescimento",
      description: "Estratégia digital, campanhas, redes sociais e e-commerce.",
      tags: [
        { label: "Estratégia", category: "marketing" },
        { label: "Campanhas", category: "marketing" },
        { label: "E-commerce", category: "consultoria-ecom" },
      ],
    },
  ],
  en: [
    {
      accentHex: "#A818FF",
      accentRgb: "168, 24, 255",
      variant: "layers",
      title: "Engineering & Product",
      description: "Websites, web platforms, custom software, and mobile applications.",
      tags: [
        { label: "Web & Platforms", category: "web-software" },
        { label: "Software", category: "web-software" },
        { label: "Mobile", category: "web-software" },
      ],
    },
    {
      accentHex: "#145EFF",
      accentRgb: "20, 94, 255",
      variant: "orbit",
      title: "Automation, AI & Data",
      description: "System integration, process automation, AI, and data.",
      tags: [
        { label: "Automation", category: "ia-automacao" },
        { label: "LLMs & AI", category: "ia-automacao" },
        { label: "Data", category: "ia-automacao" },
      ],
    },
    {
      accentHex: "#00C885",
      accentRgb: "0, 200, 133",
      variant: "prism",
      title: "Communication & Growth",
      description: "Digital strategy, campaigns, social media, and e-commerce.",
      tags: [
        { label: "Strategy", category: "marketing" },
        { label: "Campaigns", category: "marketing" },
        { label: "E-commerce", category: "consultoria-ecom" },
      ],
    },
  ],
} as const;

export default function Home() {
  const { locale } = useLanguage();
  const pillars = PILLARS[locale];

  const contacts = [
    {
      label: "Email",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: locale === "pt" ? "Telefone" : "Phone",
      value: CONTACT_PHONE,
      href: CONTACT_PHONE_HREF,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "Midi8",
      href: SOCIAL.linkedin,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      value: SOCIAL.instagramHandle,
      href: SOCIAL.instagram,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <main className="flex-1 text-foreground overflow-x-clip">
      <Hero />

      {/* ─── 01. A Midi8 ─── */}
      <section id="sobre" className="relative w-full py-14 sm:py-28 px-4 sm:px-6 scroll-mt-16 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 studio-dot-grid opacity-70" />
        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: REVEAL_EASE }}
            className="max-w-5xl mb-7 sm:mb-14"
          >
            <KineticHeading
              className="type-headline-lg text-foreground mb-3 sm:mb-4"
              segments={
                locale === "pt"
                  ? [
                      { text: "Design simples. " },
                      { text: "Código", italic: true },
                      { text: " rigoroso. Resultados reais." },
                    ]
                  : [
                      { text: "Simple design. " },
                      { text: "Rigorous", italic: true },
                      { text: " code. Real results." },
                    ]
              }
            />
            <p className="type-body text-muted max-w-xl text-pretty">
              {locale === "pt"
                ? "Engenharia, inteligência artificial e comunicação para resolver problemas reais."
                : "Engineering, artificial intelligence, and communication to solve real problems."}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-7">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.variant}
                className={index === 2 ? "col-span-2 md:col-span-1" : ""}
              >
                <PillarCard3D index={index} {...pillar} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-divider" />
      </div>

      {/* ─── 02. Serviços ─── */}
      <ServicesCarousel />

      <div aria-hidden="true" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-divider" />
      </div>

      {/* ─── 03. Equipa ─── */}
      <TeamSection />

      <div aria-hidden="true" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="section-divider" />
      </div>

      {/* ─── 04. Contactos ─── */}
      <section id="contacto" className="relative w-full py-14 sm:py-28 px-4 sm:px-6 scroll-mt-16 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 studio-dot-grid opacity-60" />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-x-16 lg:gap-y-7 items-start">
          {/* Cabeçalho */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: REVEAL_EASE }}
            className="lg:col-span-5 lg:pt-2"
          >
            <KineticHeading
              className="type-headline-lg text-foreground mb-3 sm:mb-4"
              segments={
                locale === "pt"
                  ? [
                      { text: "Vamos dar vida ao seu próximo " },
                      { text: "projeto", italic: true },
                      { text: "." },
                    ]
                  : [
                      { text: "Let's bring your next " },
                      { text: "project", italic: true },
                      { text: " to life." },
                    ]
              }
            />
            <p className="type-body text-muted max-w-md text-pretty">
              {locale === "pt"
                ? "Conte-nos o que pretende construir, otimizar ou escalar."
                : "Tell us what you want to build, optimize, or scale."}
            </p>
          </motion.div>

          {/* Formulário (acima dos cards no mobile; coluna direita no desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.06, ease: REVEAL_EASE }}
            className="lg:col-span-7 lg:row-span-2"
          >
            <ContactForm />
          </motion.div>

          {/* Cards de contacto & redes (abaixo do formulário no mobile em 2×2; coluna esquerda no desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: REVEAL_EASE }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2.5 lg:gap-3 lg:max-w-md">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-start lg:items-center justify-between gap-3 lg:gap-4 rounded-2xl border border-black/[0.08] bg-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.04),0_14px_30px_-20px_rgba(15,23,42,0.14)] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-light hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_2px_4px_rgba(15,23,42,0.05),0_20px_38px_-18px_rgba(15,23,42,0.18)] active:scale-[0.98]"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2.5 lg:gap-3 min-w-0 w-full">
                    <span className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground shrink-0 transition-colors group-hover:bg-foreground group-hover:text-white group-hover:border-foreground">
                      {c.icon}
                    </span>
                    <div className="min-w-0 w-full">
                      <p className="text-[10px] lg:text-[11px] uppercase tracking-wider text-subtle">
                        {c.label}
                      </p>
                      <p className="text-xs lg:text-sm font-normal text-foreground truncate mt-0.5 lg:mt-0">
                        {c.value}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
