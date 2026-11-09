import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, SOCIAL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Agendar Reunião | Midi8",
  description:
    "Fale com os arquitetos da Midi8 sobre o seu projeto. Respondemos em até 24 horas para marcar uma sessão técnica.",
};

const points = [
  { title: "Resposta em até 24 horas", text: "Lemos cada pedido e respondemos para marcar a reunião." },
  { title: "Sessão técnica confidencial", text: "Arquitetura, viabilidade e planeamento, diretamente com os nossos arquitetos." },
];

export default function ContactoPage() {
  return (
    <main className="flex-1 text-foreground overflow-x-clip pt-28 pb-24">
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:pt-6">
          <p className="eyebrow mb-4">Agendar reunião</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-6">
            Vamos falar sobre o <span className="text-gradient">seu projeto.</span>
          </h1>
          <p className="text-muted leading-relaxed mb-10 max-w-md">
            Conte-nos o essencial. Um dos nossos arquitetos responde para marcar uma sessão técnica.
          </p>

          <ul className="space-y-5 mb-10">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.title}</p>
                  <p className="text-sm text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="well p-5 flex flex-col gap-3 text-sm max-w-md">
            <p className="text-subtle">Prefere falar diretamente?</p>
            {[
              { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
              { label: "Telefone", value: CONTACT_PHONE, href: CONTACT_PHONE_HREF },
              { label: "Instagram", value: SOCIAL.instagramHandle, href: SOCIAL.instagram },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center justify-between gap-4 text-secondary hover:text-foreground transition-colors"
              >
                <span className="text-subtle">{c.label}</span>
                <span className="font-mono">{c.value}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
