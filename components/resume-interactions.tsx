'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ProofIcon } from './proof-art';

export function PrintAction({ children, fallback }: { children: ReactNode; fallback: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready ? <button className="button button-quiet" type="button" onClick={() => window.print()}>
    <ProofIcon name="print" className="size-4"/>{children}
  </button> : <span className="text-sm text-muted">{fallback}</span>;
}

type TraceControls = {
  ready: boolean;
  selected: string | null;
  preview: (id: string | null) => void;
  toggle: (id: string) => void;
  clear: () => void;
};

const TraceContext = createContext<TraceControls | null>(null);

export function ResumeInteractions({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hoverRole, setHoverRole] = useState<string | null>(null);
  const [focusRole, setFocusRole] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    setReady(true);
    if (!root.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    });
    root.current.querySelectorAll('[data-reveal]').forEach(section => observer.observe(section));
    root.current.setAttribute('data-resume-ready', '');
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const skill = preview ?? selected;
    const role = focusRole ?? hoverRole;
    const matches = new Set<string>();
    const organisations = new Set<string>();
    const containsSkill = (entry: HTMLElement) => !!skill && (entry.dataset.skills ?? '').split(' ').includes(skill);
    for (const entry of element.querySelectorAll<HTMLElement>('[data-trace-role]')) {
      const match = containsSkill(entry) || (!!role && entry.id === role);
      entry.toggleAttribute('data-match', match);
      if (match) matches.add(entry.id);
      if (containsSkill(entry) && entry.dataset.organisation) organisations.add(entry.dataset.organisation);
    }
    for (const entry of element.querySelectorAll<HTMLElement>('[data-trace-work]')) {
      const match = containsSkill(entry);
      entry.toggleAttribute('data-match', match);
      if (match && entry.dataset.organisation) organisations.add(entry.dataset.organisation);
    }
    for (const mark of element.querySelectorAll('[data-rule-role]')) {
      mark.toggleAttribute('data-match', matches.has(mark.getAttribute('data-rule-role') ?? ''));
    }
    element.toggleAttribute('data-tracing', matches.size > 0);
    const places = new Intl.ListFormat('en-AU').format([...organisations]);
    setAnnouncement(skill ? places ? `Used at ${places}` : 'No related experience or selected work' : '');
  }, [selected, preview, hoverRole, focusRole]);

  function roleAt(target: EventTarget | null) {
    return target instanceof Element ? target.closest<HTMLElement>('[data-trace-role]')?.id ?? null : null;
  }

  return <TraceContext.Provider value={{ ready, selected, preview: setPreview,
    toggle: id => { setPreview(null); setSelected(current => current === id ? null : id); },
    clear: () => { setPreview(null); setSelected(null); },
  }}>
    <div ref={root} onPointerOver={event => setHoverRole(event.pointerType === 'touch' ? null : roleAt(event.target))}
      onPointerOut={event => setHoverRole(event.pointerType === 'touch' ? null : roleAt(event.relatedTarget))}
      onFocus={event => setFocusRole(roleAt(event.target))}
      onBlur={event => setFocusRole(roleAt(event.relatedTarget))}>
      {children}
      <span className="sr-only screen-only" role="status">{announcement}</span>
    </div>
  </TraceContext.Provider>;
}

export function TraceSkill({ id, children, label }: { id: string; children: ReactNode; label: string }) {
  const trace = useContext(TraceContext);
  const layout = 'grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1 py-2.5 text-left';
  return trace?.ready ? <button type="button"
    className={`${layout} hover:text-accent-ink aria-pressed:text-accent-ink`}
    aria-label={label} aria-pressed={trace.selected === id}
    onClick={() => trace.toggle(id)} onFocus={() => trace.preview(id)} onBlur={() => trace.preview(null)}>
    {children}
  </button> : <div className={layout}>{children}</div>;
}

export function ClearTrace({ children }: { children: ReactNode }) {
  const trace = useContext(TraceContext);
  if (!trace?.ready) return null;
  return <button type="button" className="technical text-link" onClick={trace.clear}>{children}</button>;
}
