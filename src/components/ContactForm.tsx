"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import { useLanguage } from "@/context/LanguageContext";
import {
  AREAS,
  AREA_LABELS,
  contactMailto,
  toContactRequest,
  validateContact,
  type Area,
  type ContactErrors,
  type ContactRequest,
} from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "failed";

const FORM_COPY = {
  pt: {
    nameLabel: "Nome",
    namePlaceholder: "O seu nome",
    companyLabel: "Empresa",
    companyPlaceholder: "Nome da empresa",
    emailLabel: "Email corporativo",
    emailPlaceholder: "nome@empresa.pt",
    areasLegend: "Áreas de interesse",
    areasHint: "(pode escolher mais do que uma)",
    messageLabel: "Descrição do projeto",
    messagePlaceholder: "Objetivo, contexto atual, prazos e o que precisa de nós.",
    privacyPrefix: "Usamos os seus dados apenas para responder a este pedido, nos termos da",
    privacyLink: "Política de Privacidade",
    submitIdle: "Enviar Mensagem",
    submitSending: "A enviar…",
    sentTitle: "Pedido enviado.",
    sentBody: "Respondemos em até 24 horas para marcar a reunião.",
    sentAgain: "Enviar outro pedido",
    failedPrefix: "Não foi possível enviar agora.",
    failedLink: "Enviar por email",
    failedSuffix: "com os mesmos dados.",
  },
  en: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    companyLabel: "Company",
    companyPlaceholder: "Company name",
    emailLabel: "Work email",
    emailPlaceholder: "name@company.com",
    areasLegend: "Areas of interest",
    areasHint: "(select one or more)",
    messageLabel: "Project description",
    messagePlaceholder: "Goals, current context, timeline, and what you need from us.",
    privacyPrefix: "We only use your details to respond to this inquiry, under our",
    privacyLink: "Privacy Policy",
    submitIdle: "Send Message",
    submitSending: "Sending…",
    sentTitle: "Request sent.",
    sentBody: "We will reply within 24 hours to schedule a meeting.",
    sentAgain: "Send another request",
    failedPrefix: "Could not send right now.",
    failedLink: "Send via email",
    failedSuffix: "with the same details.",
  },
} as const;

function Field({
  id,
  label,
  error,
  children,
}: {
  id: keyof ContactRequest;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      <label htmlFor={id} className="text-xs sm:text-sm text-secondary">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);
  const [sentData, setSentData] = useState<ContactRequest | null>(null);
  const { locale } = useLanguage();

  const copy = FORM_COPY[locale];
  const areaLabels = AREA_LABELS[locale];

  function toggleArea(area: Area) {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    const data = toContactRequest({ ...fields, areas: selectedAreas });
    const errs = validateContact(data, locale);
    setErrors(errs);
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setSentData(data);
    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: fields.website ?? "" }),
      });
      if (res.ok) {
        setStatus("sent");
        setSelectedAreas([]);
        form.reset();
        return;
      }
      if (res.status === 422) {
        const body = await res.json().catch(() => null);
        if (body?.errors) {
          setErrors(body.errors);
          setStatus("idle");
          return;
        }
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="neu-panel p-8 sm:p-12 text-center" role="status">
        <div className="success-pulse mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-brand-blue/25 bg-brand-blue/10 text-brand-blue">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-normal tracking-tight mb-3">{copy.sentTitle}</h2>
        <p className="text-muted mb-8">{copy.sentBody}</p>
        <button type="button" className="neu-option" onClick={() => setStatus("idle")}>
          {copy.sentAgain}
        </button>
      </div>
    );
  }

  const invalid = (k: keyof ContactRequest) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-error` } : {};

  return (
    <form onSubmit={onSubmit} noValidate className="neu-panel p-3.5 sm:p-9 flex flex-col gap-2.5 sm:gap-5">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
        <Field id="name" label={copy.nameLabel} error={errors.name}>
          <input id="name" name="name" autoComplete="name" className="neu-field max-sm:!py-2 max-sm:!px-2.5 max-sm:!text-xs" placeholder={copy.namePlaceholder} {...invalid("name")} />
        </Field>
        <Field id="company" label={copy.companyLabel} error={errors.company}>
          <input id="company" name="company" autoComplete="organization" className="neu-field max-sm:!py-2 max-sm:!px-2.5 max-sm:!text-xs" placeholder={copy.companyPlaceholder} {...invalid("company")} />
        </Field>
      </div>

      <Field id="email" label={copy.emailLabel} error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className="neu-field max-sm:!py-2 max-sm:!px-2.5 max-sm:!text-xs" placeholder={copy.emailPlaceholder} {...invalid("email")} />
      </Field>

      <fieldset className="flex flex-col gap-1.5 sm:gap-2" {...(errors.areas ? { "aria-describedby": "areas-error" } : {})}>
        <legend className="text-xs sm:text-sm text-secondary mb-1 sm:mb-1.5">
          {copy.areasLegend} <span className="text-subtle text-[11px] sm:text-xs">{copy.areasHint}</span>
        </legend>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {AREAS.map((area) => {
            const isSelected = selectedAreas.includes(area);
            return (
              <label key={area} className="neu-option justify-start max-sm:!py-2 max-sm:!px-2.5 max-sm:!text-[11px] max-sm:!gap-1.5">
                <input
                  type="checkbox"
                  name="areas"
                  value={area}
                  checked={isSelected}
                  onChange={() => toggleArea(area)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "border-white/40 bg-white/15 text-white"
                      : "border-border-strong bg-surface text-transparent"
                  }`}
                >
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.25l2.5 2.5 5-5.25" />
                  </svg>
                </span>
                <span>{areaLabels[area]}</span>
              </label>
            );
          })}
        </div>
        {errors.areas && (
          <p id="areas-error" className="text-xs text-danger">
            {errors.areas}
          </p>
        )}
      </fieldset>

      <Field id="message" label={copy.messageLabel} error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={2}
          className="neu-field resize-none min-h-16 sm:min-h-28 max-sm:!py-2 max-sm:!px-2.5 max-sm:!text-xs"
          placeholder={copy.messagePlaceholder}
          {...invalid("message")}
        />
      </Field>

      {/* Honeypot anti-spam: invisível para pessoas */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "failed" && sentData && (
        <p role="alert" className="text-sm text-secondary">
          {copy.failedPrefix}{" "}
          <a href={contactMailto(sentData, locale)} className="text-brand-blue underline underline-offset-4 max-md:inline-flex max-md:items-center max-md:min-h-11">
            {copy.failedLink}
          </a>{" "}
          {copy.failedSuffix}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-subtle leading-relaxed">
          {copy.privacyPrefix}{" "}
          <Link href="/privacidade" className="underline underline-offset-4 hover:text-foreground transition-colors">
            {copy.privacyLink}
          </Link>
          .
        </p>
        <MagneticButton
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          wrapperClassName="inline-flex self-end sm:self-auto"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground bg-transparent text-foreground hover:text-white px-5 py-2.5 type-label whitespace-nowrap shrink-0 cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-progress"
        >
          <span>{status === "sending" ? copy.submitSending : copy.submitIdle}</span>
          {status === "sending" && <span className="spinner" aria-hidden="true" />}
        </MagneticButton>
      </div>
    </form>
  );
}
