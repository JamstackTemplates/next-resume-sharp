import type { ReactNode } from 'react';
import type { Credit, Education, Experience, Profile, Skill, Work } from '../content/resume';
import type { CareerRuleData } from '../lib/career-rule';
import { asset } from '../lib/paths';
import { displayMonth } from '../lib/resume-data';
import { CareerRule } from './career-rule';
import { ColorCalibrationBar, Crops, ProofIcon, RegistrationDivider } from './proof-art';
import { TraceSkill } from './resume-interactions';
import { SiteLink } from './site-link';

export function FolioStrip({ folio, meta }: { folio: string; meta: string }) {
  return <div className="folio-strip inset-sheet screen-only flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2.5 font-mono text-[.68rem] tracking-[.09em] text-muted uppercase">
    <span className="inline-flex items-center gap-2">
      <ProofIcon name="target" className="size-3.5 text-accent-ink"/>
      <span>{folio}</span>
    </span>
    <div className="flex items-center gap-3">
      <span className="hidden sm:inline">{meta}</span>
      <ColorCalibrationBar/>
    </div>
  </div>;
}

function HeroSection({ caption, children }: { caption?: string; children: ReactNode }) {
  return <header className="masthead inset-sheet screen-only grid items-center gap-8 py-9 md:grid-cols-12 md:gap-7 md:py-14 lg:gap-10 lg:py-16">
    <div className="min-w-0 md:col-span-6 lg:col-span-6">{children}</div>
    <div className="min-w-0 md:col-span-6 lg:col-span-6">
      <figure className="hero-specimen">
        <Crops/>
        <div className="hero-specimen-stage">
          <img
            src={asset('/hero-proof-light.jpg')}
            alt="Overhead editorial flat-lay of a Swiss-typographic design system galley proof with spacing tokens, WCAG contrast ratios, transit departures diagram, brushed steel millimeter ruler, vermilion drafting pencil, and brass optical loupe."
            width={1200}
            height={896}
            fetchPriority="high"
            decoding="async"
            className="hero-specimen-img hero-img-light"
          />
          <img
            src={asset('/hero-proof-dark.jpg')}
            alt="Overhead editorial flat-lay of a dark-mode architectural design system galley proof with spacing tokens, WCAG contrast ratios, transit departures diagram, dark anodized millimeter ruler, vermilion drafting pencil, and brass optical loupe."
            width={1200}
            height={896}
            fetchPriority="high"
            decoding="async"
            className="hero-specimen-img hero-img-dark"
          />
        </div>
        <figcaption className="hero-specimen-caption flex items-center justify-between gap-3 px-3.5 py-2 font-mono text-[.64rem] tracking-[.08em] text-muted uppercase">
          <span className="truncate">{caption || 'FIG 01 · SYSTEM GALLEY PROOF & SCALE'}</span>
          <span className="shrink-0 text-accent-ink">1:1</span>
        </figcaption>
      </figure>
    </div>
  </header>;
}
function HeroHeading({ children }: { children: string }) {
  const [first, ...remaining] = children.trim().split(/\s+/);
  return <h1 className="masthead-name expanded" aria-label={children}><span>{first}</span>{remaining.length > 0 && <span>{remaining.join(' ')}</span>}</h1>;
}
function HeroRole({ children }: { children: ReactNode }) {
  return <p className="condensed mt-5 flex items-center gap-3 text-[clamp(1.25rem,2.3vw,2.1rem)] leading-none tracking-wide uppercase md:mt-7">
    <span className="h-[2px] w-6 shrink-0 bg-accent-ink md:w-8" aria-hidden="true"/>{children}
  </p>;
}
function Pitch({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-[30ch] text-[clamp(1.08rem,1.85vw,1.5rem)] leading-snug font-medium tracking-tight">{children}</p>;
}
function HeroActions({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-wrap items-center gap-3">{children}</div>;
}

export const Hero = Object.assign(HeroSection, { Heading: HeroHeading, Role: HeroRole, Pitch, Actions: HeroActions });

export function ContactAction({ children }: { children: ReactNode }) {
  return <SiteLink href="/contact/" className="button"><ProofIcon name="arrow" className="size-4"/>{children}</SiteLink>;
}

export function Availability({ availability }: { availability: Profile['availability'] }) {
  return <p className="flex items-start gap-2.5" data-availability={availability.status}>
    <ProofIcon name="target" className="mt-0.5 size-4 shrink-0 text-accent-ink"/>
    <span>{availability.label}{availability.status !== 'closed' && availability.from &&
      <><br/><span className="text-muted">Target start · <time dateTime={availability.from}>{displayMonth(availability.from)}</time></span></>}</span>
  </p>;
}

export function SpecPlate({ children }: { children: ReactNode }) {
  return <dl className="plate screen-only relative grid grid-cols-2 md:grid-cols-[1fr_1.05fr_.78fr_1.32fr_1.27fr]">{children}</dl>;
}
export function SpecCell({ label, children }: { label: ReactNode; children: ReactNode }) {
  return <div className="min-w-0 border-b border-line px-[clamp(1rem,2.4vw,2rem)] py-4 odd:border-r md:border-r md:border-b-0 md:last:border-r-0">
    <dt className="technical mb-2 text-muted">{label}</dt><dd className="font-mono text-xs leading-relaxed sm:text-sm">{children}</dd>
  </div>;
}

export function SectionHeading({ id, mark, index, children }: {
  id: string; mark: 'pilcrow' | 'caret' | 'stet' | 'delete' | 'target'; index?: string; children: ReactNode;
}) {
  return <div className="section-heading flex items-center gap-2.5">
    <span className="screen-only text-xl leading-none text-accent-ink" aria-hidden="true">
      {mark === 'pilcrow' ? '¶' : <ProofIcon name={mark}/>}
    </span>
    {index && <span aria-hidden="true" className="screen-only font-mono text-xs font-semibold tracking-[.1em] text-muted">{index} /</span>}
    <h2 id={id} className="condensed text-2xl leading-none tracking-tight uppercase">{children}</h2>
  </div>;
}

export function ProfileSection({ children }: { children: ReactNode }) {
  return <section aria-labelledby="profile-heading" data-reveal className="inset-sheet pt-11 pb-12 md:py-16">
    <div className="proof-frame profile-grid relative grid gap-5 px-5 py-6 sm:px-7 md:grid-cols-12 md:gap-4 md:py-9"><Crops/>
      {children}
    </div>
  </section>;
}
export function ProfileCopy({ children }: { children: ReactNode }) {
  return <p className="profile-copy text-[clamp(1.25rem,2.35vw,2.05rem)] leading-[1.33] tracking-[-.04em] md:col-span-9">{children}</p>;
}
export function Swipe({ children }: { children: ReactNode }) {
  return <mark className="swipe">{children}</mark>;
}

export function ExperienceSection({ data, children }: { data: CareerRuleData; children: ReactNode }) {
  return <section id="experience" aria-labelledby="experience-heading" className="section-rule inset-sheet pt-11 pb-12 md:pt-15 md:pb-20" data-reveal>
    <div className="experience-grid grid gap-x-5 gap-y-5 md:grid-cols-12">
      <div className="screen-only min-w-0 md:col-span-2"><CareerRule data={data}/></div>
      <div className="min-w-0 md:col-span-10">{children}</div>
    </div>
  </section>;
}
export function RoleEntries({ roles, skills }: { roles: Experience[]; skills: Skill[] }) {
  return <div className="role-list mt-6 md:mt-8">
    {roles.map((role, roleIndex) => <article key={role.id} id={role.id} tabIndex={0} aria-labelledby={`role-${role.id}`}
      data-trace-role data-organisation={role.organisation} data-skills={role.skillIds.join(' ')}
      className="role-entry py-6 pr-1 pl-0 transition-[box-shadow] md:py-8 md:pr-6 md:pl-4"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="condensed flex items-center gap-2 text-lg tracking-[.045em] text-accent-ink uppercase">
          <span aria-hidden="true" className="screen-only font-mono text-[.7rem] text-muted">{String(roleIndex + 1).padStart(2, '0')}</span>
          {role.organisation}
        </p>
        <p className="role-meta technical text-muted">
          <time dateTime={role.start}>{displayMonth(role.start)}</time> – {role.end ? <time dateTime={role.end}>{displayMonth(role.end)}</time> : 'Present'} · {role.mode}{role.location && `, ${role.location}`}
        </p>
      </div>
      <h3 id={`role-${role.id}`} className="mt-1.5 font-display text-[clamp(1.55rem,3vw,2.65rem)] leading-none font-extrabold tracking-[-.035em]">{role.role}</h3>
      <p className="role-summary mt-3 text-muted">{role.summary}</p>
      <ul className="role-highlights mt-4">
        {role.highlights.map(({ text, metric }, index) => <li key={index} className="grid grid-cols-[6rem_1fr] items-start gap-3 border-b border-line py-3.5 last:border-b-0 md:grid-cols-[9.5rem_1fr] md:gap-5">
          {metric ? <div className="metric metric-plate leading-tight">
            <strong className="font-mono text-[clamp(1.3rem,2.4vw,1.9rem)] leading-none tracking-tight"><Swipe>{metric.value}</Swipe></strong>
            <span className="mt-1 block font-mono text-[.66rem] text-muted md:text-[.72rem]">{metric.label}</span>
          </div> : <span aria-hidden="true" className="screen-only mt-0.5 inline-flex self-center text-accent-ink"><ProofIcon name="caret"/></span>}
          <p className="self-center">{text}</p>
        </li>)}
      </ul>
      <ul className="screen-only mt-4 flex flex-wrap gap-1.5" aria-label="Skills used">
        {role.skillIds.map(id => <li key={id} className="border border-line bg-surface-tint px-2 py-0.5 font-mono text-[.7rem] text-muted">{skills.find(skill => skill.id === id)?.label}</li>)}
      </ul>
    </article>)}
  </div>;
}

export function SkillsSection({ children }: { children: ReactNode }) {
  return <section id="skills" aria-labelledby="skills-heading" className="section-rule inset-sheet screen-only pt-11 pb-14 md:pt-15 md:pb-19">{children}</section>;
}
export function SkillGroups({ children }: { children: ReactNode }) {
  return <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-0">{children}</div>;
}
export function SkillGroup({ number, children, entries, year, print = false }: {
  number?: string; children: ReactNode; entries: Skill[]; year: number; print?: boolean;
}) {
  return <div className={print ? '' : 'min-w-0 border-t-2 border-ink md:border-r md:border-r-line md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0'}>
    <h3 className={print ? 'condensed' : 'condensed flex items-baseline gap-2.5 py-3.5 text-xl uppercase'}>
      {number && <span aria-hidden="true" className="expanded text-4xl tracking-tighter text-accent-ink">{number}</span>}{children}
    </h3>
    <ul>
      {entries.map(skill => {
        const years = year - skill.since;
        return print ? <li key={skill.id} className="print-skill gap-1">
          <span>{skill.label}</span><span aria-label={`Level ${skill.level} of 5`} className="shrink-0 font-mono text-[7pt] tracking-tighter">
            {'●'.repeat(skill.level)}{'○'.repeat(5 - skill.level)}</span>
        </li> : <li key={skill.id} className="border-t border-line">
          <TraceSkill id={skill.id} label={`${skill.label}, ${years} ${years === 1 ? 'year' : 'years'}, level ${skill.level} of 5`}>
            <span className="col-span-2 text-[.93rem] leading-tight font-semibold">{skill.label}</span>
            <span className="font-mono text-xs text-muted">{years} {years === 1 ? 'year' : 'years'}</span>
            <SkillNotches level={skill.level}/>
          </TraceSkill>
        </li>;
      })}
    </ul>
  </div>;
}
function SkillNotches({ level }: { level: number }) {
  return <svg role="img" aria-label={`Level ${level} of 5`} fill="none" strokeWidth="1.25" viewBox="0 0 65 15" width="65" height="15">
    <path d="M.625 14.375V.625h63.75v13.75z" stroke="var(--steel)"/>
    {[0, 1, 2, 3, 4].map(n => <rect key={n} x={4 + n * 12} y="4" width="8" height="7" stroke="currentColor" fill={n < level ? 'currentColor' : 'none'}/>)}
  </svg>;
}

export function WorkSection({ children }: { children: ReactNode }) {
  return <section id="work" aria-labelledby="work-heading" className="work-band inset-sheet py-12 md:py-17">{children}</section>;
}
export function WorkSlips({ entries, roles }: { entries: Work[]; roles: Experience[] }) {
  return <div className="work-grid mt-7 grid gap-4 lg:grid-cols-12">
    {entries.map((entry, index) => {
      const organisation = roles.find(role => role.id === entry.experienceId)!.organisation;
      return <article key={entry.id} id={entry.id} data-trace-work data-skills={entry.skillIds.join(' ')} data-organisation={organisation}
        className={`work-slip relative grid grid-cols-[3rem_1fr] gap-3 border border-current/25 py-4 pr-3.5 pl-4 sm:grid-cols-[4rem_1fr] sm:gap-5 sm:p-5 ${index % 4 === 0 || index % 4 === 3 ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
        <Crops/>
        <span aria-hidden="true" className="screen-only expanded text-[2rem] leading-none tracking-tighter text-(--band-mark) sm:text-[2.65rem]">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3 className="font-display text-2xl leading-none font-bold tracking-tight">{entry.title}</h3>
          <p className="mt-1.5 font-mono text-xs text-(--band-muted)"><time>{entry.year}</time> · {entry.role}</p>
          <p className="mt-2.5 text-sm leading-relaxed">{entry.outcome}</p>
          <div className="mt-3 flex items-center gap-2 text-xs"><span aria-hidden="true" className="screen-only w-4 border-t border-(--band-mark)"/>
            <a href={`#${entry.experienceId}`} className="underline decoration-current/50 hover:text-(--band-mark)">{organisation}</a>
          </div>
        </div>
      </article>;
    })}
  </div>;
}

export function Colophon({ children, print = false }: { children: ReactNode; print?: boolean }) {
  return <div className={print ? 'grid gap-2' : 'mt-7 grid gap-5 md:grid-cols-3 md:gap-0'}>{children}</div>;
}
export function ColophonColumn({ title, children, print = false }: { title: ReactNode; children: ReactNode; print?: boolean }) {
  return <div className={print ? '' : 'border-t-2 border-ink pt-3.5 md:border-r md:border-r-line md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0'}>
    <h3 className={print ? 'condensed' : 'technical mb-3 text-muted'}>{title}</h3>
    <ul className="grid gap-2.5">{children}</ul>
  </div>;
}
export function EducationEntry({ entry }: { entry: Education }) {
  return <Record year={`${entry.start.slice(0, 4)}–${entry.end.slice(0, 4)}`} title={entry.credential} place={entry.institution}/>;
}
export function CreditEntry({ entry }: { entry: Credit }) {
  return <Record year={entry.year} title={entry.title} place={entry.issuer}/>;
}
function Record({ year, title, place }: { year: string | number; title: string; place: string }) {
  return <li className="colophon-record grid grid-cols-[4.1rem_1fr] items-baseline gap-2 text-sm">
    <span className="font-mono text-[.71rem] text-muted">{year}</span>
    <div><p className="font-semibold">{title}</p><p className="text-muted">{place}</p></div>
  </li>;
}

export function ClosingSection({ stamp, children }: { stamp: ReactNode; children: ReactNode }) {
  return <section className="inset-sheet screen-only pb-11 md:pb-14">
    <RegistrationDivider label="END OF PROOF"/>
    <div className="flex flex-wrap items-center justify-between gap-5 pt-8 md:justify-start md:gap-10">
      <div className="stamp"><p className="condensed px-2 text-xl leading-none tracking-wide uppercase">{stamp}</p></div>
      <div>{children}</div>
    </div>
  </section>;
}

export function MatScale() {
  return <div aria-hidden="true" className="mat-scale screen-only absolute inset-x-0 -top-5 flex justify-between px-1 font-mono text-[.63rem] text-muted">
    <span>00</span><span>50</span><span>100</span><span>150</span><span>200</span><span>250</span><span>300 mm</span>
  </div>;
}
