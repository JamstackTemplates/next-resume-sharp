import { DarkModeToggle } from 'jamstacks';
import { profile } from '../content/resume';
import { ProofIcon } from './proof-art';
import { SectionNavigation } from './section-navigation';
import { SiteLink } from './site-link';

export function SiteHeader() {
  return <header className="site-header ruler-edge sticky top-0 z-30 pb-1.5">
    <div className="wrap flex min-h-13 items-center justify-between gap-2 md:min-h-15">
      <SiteLink href="/" className="condensed flex shrink-0 items-center gap-1.5 text-base leading-none uppercase sm:gap-2 sm:text-xl"
        aria-label={`${profile.name} — Resume`}>
        <ProofIcon name="target" className="size-5 text-accent-ink"/>{profile.name}
      </SiteLink>
      <nav aria-label="Main" className="site-nav technical flex items-center gap-2.5 text-[.66rem] sm:gap-4 sm:text-xs lg:gap-6">
        <SiteLink href="/" markCurrent="page" className="hidden lg:block">Resume</SiteLink>
        <SectionNavigation/>
        <SiteLink href="/contact/" markCurrent="page">Contact</SiteLink>
        <DarkModeToggle style={{ borderRadius: 0 }}/>
      </nav>
    </div>
  </header>;
}
