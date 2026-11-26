import type { ReactNode } from 'react';
import { Crops, ProofIcon } from './proof-art';

export function ContactLayout({ children }: { children: ReactNode }) {
  return <div className="wrap grid gap-9 pb-8 md:grid-cols-12 md:items-start md:gap-10 md:pb-13">{children}</div>;
}

export function EnquiryDetails({ children }: { children: ReactNode }) {
  return <section aria-labelledby="checklist-heading" className="section-rule min-w-0 pt-5 md:col-span-4">{children}</section>;
}

export function ChecklistItem({ children }: { children: ReactNode }) {
  return <li className="flex gap-2.5 border-b border-line py-2.5">
    <ProofIcon name="caret" className="mt-0.5 shrink-0 text-accent-ink"/><span>{children}</span>
  </li>;
}

export function EnquirySheet({ children }: { children: ReactNode }) {
  return <section aria-labelledby="enquiry-heading" className="proof-sheet min-h-50 p-5 sm:p-8 md:col-span-8 md:p-10">
    <Crops/>{children}
  </section>;
}

export function ContactLink({ email, phone }: { email: string; phone?: never } | { email?: never; phone: string }) {
  const href = email ? `mailto:${email}` : `tel:${phone!.replace(/[^\d+]/g, '')}`;
  return <a href={href} className="text-link flex items-start gap-2 wrap-anywhere">
    <ProofIcon name={email ? 'email' : 'phone'} className="mt-0.5 shrink-0"/><span>{email || phone}</span>
  </a>;
}
