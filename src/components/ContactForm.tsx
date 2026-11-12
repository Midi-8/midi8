"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  AREAS,
  contactMailto,
  toContactRequest,
  validateContact,
  type ContactErrors,
  type ContactRequest,
} from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "failed";

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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-secondary">
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
  const [sentData, setSentData] = useState<ContactRequest | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    const data = toContactRequest(fields);
    const errs = validateContact(data);
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
        <div className="success-pulse mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full neu-option !p-0 text-accent">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-3">Pedido enviado.</h2>
        <p className="text-muted mb-8">Respondemos em até 24 horas para marcar a reunião.</p>
        <button type="button" className="neu-option" onClick={() => setStatus("idle")}>
          Enviar outro pedido
        </button>
      </div>
    );
  }

  const invalid = (k: keyof ContactRequest) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-error` } : {};

  return (
    <form onSubmit={onSubmit} noValidate className="neu-panel p-6 sm:p-10 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field id="name" label="Nome" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className="neu-field" placeholder="O seu nome" {...invalid("name")} />
        </Field>
        <Field id="company" label="Empresa" error={errors.company}>
          <input id="company" name="company" autoComplete="organization" className="neu-field" placeholder="Nome da empresa" {...invalid("company")} />
        </Field>
      </div>

      <Field id="email" label="Email corporativo" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className="neu-field" placeholder="nome@empresa.pt" {...invalid("email")} />
      </Field>

      <fieldset className="flex flex-col gap-3" {...(errors.area ? { "aria-describedby": "area-error" } : {})}>
        <legend className="text-sm text-secondary mb-3">Área de interesse</legend>
        <div className="flex flex-wrap gap-3">
          {AREAS.map((area) => (
            <label key={area} className="neu-option">
              <input type="radio" name="area" value={area} className="sr-only" />
              {area}
            </label>
          ))}
        </div>
        {errors.area && (
          <p id="area-error" className="text-xs text-danger">
            {errors.area}
          </p>
        )}
      </fieldset>

      <Field id="message" label="Descrição do projeto" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="neu-field resize-y min-h-32"
          placeholder="Objetivo, contexto atual, prazos e o que precisa de nós."
          {...invalid("message")}
        />
      </Field>

      {/* Honeypot anti-spam: invisível para pessoas */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "failed" && sentData && (
        <p role="alert" className="text-sm text-secondary">
          Não foi possível enviar agora.{" "}
          <a href={contactMailto(sentData)} className="text-accent underline underline-offset-4 max-md:inline-flex max-md:items-center max-md:min-h-11">
            Enviar por email
          </a>{" "}
          com os mesmos dados.
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-subtle">Usamos os seus dados apenas para responder a este pedido.</p>
        <button type="submit" className="neu-submit" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? "A enviar…" : "Pedir reunião"}
          {status === "sending" ? (
            <span className="spinner" aria-hidden="true" />
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
