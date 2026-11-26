import type { Metadata } from 'next';
import { business } from '../content/business';
import { credits, education, experience, profile, skills, work } from '../content/resume';
import { LocalTime } from '../components/local-time';
import { Crops, ProofIcon } from '../components/proof-art';
import { ClearTrace, PrintAction, ResumeInteractions } from '../components/resume-interactions';
import {
  Availability, ClosingSection, Colophon, ColophonColumn, ContactAction, CreditEntry, EducationEntry, ExperienceSection,
  FolioStrip, Hero, MatScale, ProfileCopy, ProfileSection, RoleEntries, SectionHeading, SkillGroup, SkillGroups, SkillsSection,
  SpecCell, SpecPlate, Swipe, WorkSection, WorkSlips,
} from '../components/resume-layout';
import { absoluteUrl } from '../lib/paths';
import { jsonLd, profileStructuredData } from '../lib/structured-data';
import { careerRule } from '../lib/career-rule';
import { currentMonth, experienceYears } from '../lib/resume-data';
import { site } from '../lib/site';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

export default function HomePage() {
  const zone = site.timeZone || profile.timeZone;
  const month = currentMonth(zone);
  const year = Number(month.slice(0, 4));
  const data = careerRule(experience, month);
  const location = `${profile.location.locality}, ${profile.location.country}`;
  const groups = (print = false) => <>
    <SkillGroup number={print ? undefined : '01'} entries={skills.filter(skill => skill.group === 'engineering')} year={year} print={print}>Engineering</SkillGroup>
    <SkillGroup number={print ? undefined : '02'} entries={skills.filter(skill => skill.group === 'design')} year={year} print={print}>Design</SkillGroup>
    <SkillGroup number={print ? undefined : '03'} entries={skills.filter(skill => skill.group === 'leadership')} year={year} print={print}>Leadership</SkillGroup>
  </>;
  const colophon = (print = false) => <Colophon print={print}>
    <ColophonColumn title="Education" print={print}>{education.map(entry => <EducationEntry key={entry.id} entry={entry}/>)}</ColophonColumn>
    <ColophonColumn title="Certification" print={print}>{credits.filter(entry => entry.kind === 'certification').map(entry => <CreditEntry key={entry.id} entry={entry}/>)}</ColophonColumn>
    <ColophonColumn title="Talks" print={print}>{credits.filter(entry => entry.kind === 'talk').map(entry => <CreditEntry key={entry.id} entry={entry}/>)}</ColophonColumn>
  </Colophon>;

  return <article className="resume proof-sheet wrap mt-10 mb-12 md:mt-13 md:mb-17">
    <MatScale/>
    <Crops/>
    <FolioStrip folio="FOLIO 01 · CURRICULUM VITAE" meta={`${profile.location.locality.toUpperCase()} · REV ${month.replace('-', '.')}`}/>
    <Hero caption="FIG 01 · DESIGN SYSTEMS, WCAG 2.2 & TRANSIT UI">
      <Hero.Heading>{profile.name}</Hero.Heading>
      <Hero.Role>{profile.title}</Hero.Role>
      <Hero.Pitch>{profile.pitch}</Hero.Pitch>
      <div className="mt-5 max-w-[38ch] text-sm font-medium md:text-base"><Availability availability={profile.availability}/></div>
      <Hero.Actions>
        <ContactAction>Get in touch</ContactAction>
        <PrintAction fallback="Use your browser’s Print command to save a PDF.">Print / save as PDF</PrintAction>
      </Hero.Actions>
    </Hero>
    <SpecPlate>
      <SpecCell label="Based in"><span className="inline-flex items-start gap-1.5"><ProofIcon name="location" className="size-4 shrink-0 text-accent-ink"/>{location}</span>
        <span className="mt-1 block text-muted">Hybrid in Melbourne<br/>Remote within ±4 h of AET</span></SpecCell>
      <SpecCell label="Local time"><LocalTime hours={profile.workingHours} zone={zone}>{location} (AET)</LocalTime></SpecCell>
      <SpecCell label="Experience">{experienceYears(experience, month)} years</SpecCell>
      <SpecCell label="Open to"><Availability availability={profile.availability}/></SpecCell>
      <SpecCell label="Languages"><ul>{profile.languages.map(language => <li key={language.name}>{language.name} <span className="text-muted">· {language.proficiency}</span></li>)}</ul></SpecCell>
    </SpecPlate>
    <header className="print-only print-head">
      <h1 className="expanded">{profile.name}</h1>
      <p className="condensed text-xl uppercase">{profile.title}</p>
      <p className="print-contacts font-mono">{business.email} · {business.phone} · {profile.location.locality}{site.domain && ` · ${site.domain}`}</p>
    </header>
    <aside className="print-only print-sidebar" aria-label="Skills, languages and education">
      <section><h2 className="condensed">Skills</h2>{groups(true)}</section>
      <section><h2 className="condensed">Languages</h2><ul>{profile.languages.map(language => <li key={language.name}>{language.name} · {language.proficiency}</li>)}</ul></section>
      <section aria-label="Education, certification and talks">{colophon(true)}</section>
    </aside>

    <ResumeInteractions>
      <div className="print-main">
        <ProfileSection>
          <div className="md:col-span-3"><SectionHeading id="profile-heading" mark="pilcrow" index="01">Profile</SectionHeading></div>
          <ProfileCopy>{profile.summary.opening}<Swipe>{profile.summary.emphasis}</Swipe>{profile.summary.closing}</ProfileCopy>
          <div className="print-only mt-1 font-medium"><Availability availability={profile.availability}/></div>
        </ProfileSection>
        <ExperienceSection data={data}>
          <SectionHeading id="experience-heading" mark="caret" index="02">Experience</SectionHeading>
          <RoleEntries roles={experience} skills={skills}/>
        </ExperienceSection>
        <SkillsSection>
          <div className="flex flex-wrap items-end justify-between gap-2 pb-1">
            <SectionHeading id="skills-heading" mark="stet" index="03">Skills</SectionHeading>
            <ClearTrace>Clear skill trace</ClearTrace>
          </div>
          <SkillGroups>{groups()}</SkillGroups>
        </SkillsSection>
        <WorkSection>
          <SectionHeading id="work-heading" mark="delete" index="04">Selected work</SectionHeading>
          <WorkSlips entries={work} roles={experience}/>
        </WorkSection>
        <section id="education" aria-labelledby="education-heading" className="section-rule inset-sheet screen-only py-11 md:py-16">
          <SectionHeading id="education-heading" mark="target" index="05">Education, certification and talks</SectionHeading>
          {colophon()}
        </section>
      </div>
    </ResumeInteractions>
    <ClosingSection stamp="References on request">
      <h2 className="font-display text-[clamp(1.65rem,4vw,2.75rem)] leading-none font-extrabold tracking-tight">Have a role in mind?</h2>
      <div className="mt-4"><ContactAction>Get in touch</ContactAction></div>
    </ClosingSection>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(profileStructuredData()) }}/>
  </article>;
}
