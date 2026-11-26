'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { documentHref } from '../lib/paths';

const sections = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
];

export function SectionNavigation() {
  const isResume = usePathname() === '/';
  const [current, setCurrent] = useState<string>();
  const disclosure = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!isResume || !('IntersectionObserver' in window)) return;
    const targets = sections.map(({ id }) => document.getElementById(id)).filter(node => node !== null);
    const visible = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) visible.add(target.id);
        else visible.delete(target.id);
      }
      setCurrent(targets.find(target => visible.has(target.id))?.id);
    }, { rootMargin: '-20% 0px -55% 0px' });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, [isResume]);

  function links() {
    return sections.map(({ id, label }) =>
      <a key={id} href={isResume ? `#${id}` : documentHref(`/#${id}`)}
        aria-current={isResume && current === id ? 'location' : undefined}
        className="block py-1 hover:text-accent-ink"
        onClick={() => { if (disclosure.current) disclosure.current.open = false; }}>{label}</a>,
    );
  }

  return <>
    <div className="hidden items-center gap-6 md:flex">{links()}</div>
    <details ref={disclosure} className="relative md:hidden">
      <summary className="flex items-center gap-1 py-2 hover:text-accent-ink">
        Sections <span aria-hidden="true">▾</span>
      </summary>
      <div className="absolute top-full right-0 z-20 grid min-w-36 gap-1 border border-line bg-surface p-3">
        {links()}
      </div>
    </details>
  </>;
}
