import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { profile } from '../content/resume';
import { ProofIcon } from './proof-art';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return <footer className="site-footer ruler-edge mt-10 pt-8 pb-7">
    <div className="wrap flex flex-wrap items-center justify-between gap-x-5 gap-y-4">
      <div className="flex items-start gap-2">
        <ProofIcon name="target" className="mt-0.5 shrink-0 text-accent-ink"/>
        <div><SiteLink href="/" className="condensed text-xl leading-none uppercase">{profile.name}</SiteLink>
          <p className="text-sm text-muted">{profile.title}</p></div>
      </div>
      <a className="font-mono text-xs wrap-anywhere hover:text-accent-ink" href={`mailto:${business.email}`}>{business.email}</a>
      <div className="flex items-center gap-3">
        <p className="font-mono text-xs text-muted">Set in Hubot Sans, Geist and Source Code Pro</p>
        <DarkModeToggle style={{ borderRadius: 0 }}/>
      </div>
    </div>
  </footer>;
}
