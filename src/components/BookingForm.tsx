"use client";

import { useMutation } from "@tanstack/react-query";
import { useId, useRef, useState } from "react";
import { BsCheckCircle, BsX } from "react-icons/bs";
import { createBooking } from "@/lib/api";
import type { BookingPayload } from "@/lib/types";
import s from "./BookingForm.module.css";

export default function BookingForm({ camperId }: { camperId: string }) {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Partial<BookingPayload>>({});
  const [notification, setNotification] = useState("");
  const mutation = useMutation({
    mutationFn: (payload: BookingPayload) => createBooking(camperId, payload),
    onSuccess: result => { setNotification(result.message || "Your booking request has been accepted. We will contact you by email."); form.current?.reset(); setErrors({}); },
  });
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mutation.isPending) return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const next: Partial<BookingPayload> = {};
    if (name.length < 2) next.name = "Please enter at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.current?.querySelector<HTMLInputElement>(`[name="${next.name ? "name" : "email"}"]`)?.focus();
      return;
    }
    mutation.reset(); setNotification(""); mutation.mutate({ name, email });
  }
  return <>
    <section className={s.booking} aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}>Book your campervan now</h2>
      <p className={s.subtitle}>Stay connected! We are always ready to help you.</p>
      <form ref={form} onSubmit={submit} noValidate aria-busy={mutation.isPending}>
        <div className={s.field}>
          <label className="visually-hidden" htmlFor={`${id}-name`}>Name</label>
          <input id={`${id}-name`} name="name" placeholder="Name*" autoComplete="name" required minLength={2} maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${id}-name-error` : undefined} disabled={mutation.isPending} />
          {errors.name && <p className={s.error} id={`${id}-name-error`}>{errors.name}</p>}
        </div>
        <div className={s.field}>
          <label className="visually-hidden" htmlFor={`${id}-email`}>Email</label>
          <input id={`${id}-email`} name="email" type="email" placeholder="Email*" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${id}-email-error` : undefined} disabled={mutation.isPending} />
          {errors.email && <p className={s.error} id={`${id}-email-error`}>{errors.email}</p>}
        </div>
        {mutation.isError && <p className={s.error} role="alert">{mutation.error.message}</p>}
        <button type="submit" className="button" disabled={mutation.isPending}>{mutation.isPending ? "Sending…" : "Send"}</button>
      </form>
    </section>
    {notification && <div className={s.toast} role="status" aria-live="polite">
      <BsCheckCircle size={24} aria-hidden="true" /><div><strong>Booking request accepted</strong><p>{notification}</p></div>
      <button onClick={() => setNotification("")} aria-label="Dismiss notification"><BsX size={24} /></button>
    </div>}
  </>;
}
