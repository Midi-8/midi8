"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import KineticHeading from "@/components/KineticHeading";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";
import {
  AREAS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  SOCIAL,
  type Area,
} from "@/lib/contact";

export default function ContactoContent() {
  const { locale } = useLanguage();
  const searchParams = useSearchParams();

  const areaParams = searchParams.getAll("area");
  const briefParam = searchParams.get("brief") ?? undefined;
  const initialAreas = Array.from(
    new Set(
      areaParams.filter((value): value is Area =>
        (AREAS as readonly string[]).includes(value)
      )
    )
  );

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
      value: "midi8",
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
      {/* ─── Cabeçalho + Formulário ─── */}
      <section className="relative w-full pt-28 sm:pt-36 pb-16 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div aria-hidden="true" className="top-aurora-fade opacity-70" />
        <div aria-hidden="true" className="top-aurora-grain" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 studio-dot-grid opacity-55" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-subtle mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              {locale === "pt" ? "Início" : "Home"}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">
              {locale === "pt" ? "Contactos" : "Contact"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-x-16 lg:gap-y-7 items-start">
            <div className="lg:col-span-5 lg:pt-2">
              <KineticHeading
                className="type-headline-lg text-foreground mb-4"
                segments={
                  locale === "pt"
                    ? [
                        { text: "Comece o seu próximo " },
                        { text: "projeto", italic: true },
                        { text: "." },
                      ]
                    : [
                        { text: "Start your next " },
                        { text: "project", italic: true },
                        { text: "." },
                      ]
                }
              />
              <p className="type-body text-muted max-w-md text-pretty">
                {locale === "pt"
                  ? "Partilhe o contexto e os objetivos da sua organização. Respondemos em menos de 24 horas úteis para agendar uma conversa inicial de diagnóstico, sem compromisso."
                  : "Share your organization's context and goals. We reply within 24 business hours to schedule an initial, no-obligation discovery conversation."}
              </p>
            </div>

            <div className="lg:col-span-7 lg:row-span-2">
              <ContactForm
                key={`${initialAreas.join("|") || "default"}-${briefParam ?? ""}`}
                initialAreas={initialAreas}
                initialMessage={briefParam}
              />
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2.5 lg:gap-3 lg:max-w-md">
                {contacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
