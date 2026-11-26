/** Dates are calendar months in YYYY-MM format. End months are inclusive; null means current. */
export type Month = `${number}-${number}`;
export type SkillGroup = 'engineering' | 'design' | 'leadership';
export type WorkingHours = {
  /** ISO weekdays, Monday = 1. Times are local, opening inclusive and closing exclusive, same day. */
  days: number[];
  open: string;
  close: string;
};

export interface Profile {
  name: string;
  title: string;
  pitch: string;
  /** Three sentences. The middle phrase is marked on the proof. */
  summary: { opening: string; emphasis: string; closing: string };
  location: { locality: string; region: string; country: string };
  timeZone: string;
  /** An enquiry preference and optional target month. It does not confirm a start date. */
  availability: { status: 'open' | 'selective' | 'closed'; label: string; from: Month | null };
  workingHours: WorkingHours;
  languages: { name: string; proficiency: string }[];
}

/** IDs are stable, URL-safe slugs. Keep roles newest first and skill IDs in display order. */
export interface Experience {
  id: string;
  organisation: string;
  role: string;
  location: string;
  mode: 'onsite' | 'hybrid' | 'remote';
  start: Month;
  end: Month | null;
  summary: string;
  /** One to four highlights of up to 200 characters. The optional metric has a value and caption. */
  highlights: { text: string; metric?: { value: string; label: string } }[];
  skillIds: string[];
}

export interface Skill {
  id: string;
  label: string;
  group: SkillGroup;
  /** Proficiency from 1 through 5; since is the first year of professional use. */
  level: number;
  since: number;
}

/** References point to existing role and skill IDs. Each outcome is at most 160 characters. */
export interface Work {
  id: string;
  title: string;
  year: number;
  experienceId: string;
  role: string;
  outcome: string;
  skillIds: string[];
}

export interface Education { id: string; institution: string; credential: string; start: Month; end: Month }
export interface Credit { id: string; kind: 'certification' | 'talk'; title: string; issuer: string; year: number }

export const profile: Profile = {
  name: 'Ines Calder',
  title: 'Staff Product Engineer',
  pitch: 'I build the systems product teams ship on.',
  summary: {
    opening: 'My work spans ',
    emphasis: 'design systems, front-end performance and accessibility',
    closing: '. I’ve led engineering for rider-facing trip planning and live departures. I mentor engineers and build tools that help teams ship fast, accessible interfaces.',
  },
  location: { locality: 'Melbourne', region: 'Victoria', country: 'Australia' },
  timeZone: 'Australia/Melbourne',
  availability: { status: 'open', label: 'Open to staff and principal roles, hybrid or remote', from: '2027-02' },
  workingHours: { days: [1, 2, 3, 4, 5], open: '09:00', close: '17:30' },
  languages: [
    { name: 'English', proficiency: 'native' },
    { name: 'Spanish', proficiency: 'professional working' },
    { name: 'Auslan', proficiency: 'conversational' },
  ],
};

export const experience: Experience[] = [
  {
    id: 'harbourline-transit', organisation: 'Harbourline Transit Co.', role: 'Staff Product Engineer',
    mode: 'hybrid', location: 'Melbourne', start: '2022-03', end: null,
    summary: 'Lead engineer for the rider-facing web platform: trip planner, live departures and accessibility.',
    highlights: [
      { text: 'Rebuilt the trip planner as a static-first app with streamed live data.', metric: { value: '1.6 s', label: 'p75 LCP, down from 4.1 s' } },
      { text: 'Created Signal, the design system now used by six product teams.', metric: { value: '140', label: 'components in Signal' } },
      { text: 'Led the WCAG 2.2 AA programme across web and kiosk screens.', metric: { value: '0', label: 'open critical accessibility issues' } },
      { text: 'Mentored five engineers; two promoted to senior.' },
    ],
    skillIds: ['design-systems', 'typescript', 'react', 'web-performance', 'accessibility', 'mentoring', 'technical-strategy'],
  },
  {
    id: 'quillfeather', organisation: 'Quillfeather Reading', role: 'Senior Front-end Engineer',
    mode: 'remote', location: 'Australia', start: '2019-01', end: '2022-02',
    summary: 'Built the in-browser e-reader and the author dashboard for an independent publishing platform.',
    highlights: [
      { text: 'Shipped an accessible reader with screen-reader pagination and dyslexia-friendly typesetting.', metric: { value: '92k', label: 'monthly readers' } },
      { text: 'Cut the reader bundle by splitting typesetting into a worker.', metric: { value: '−38%', label: 'JavaScript shipped' } },
      { text: 'Ran a weekly accessibility clinic for product and design.' },
    ],
    skillIds: ['typescript', 'react', 'accessibility', 'web-performance', 'typography', 'testing'],
  },
  {
    id: 'northgate-studio', organisation: 'Northgate Studio', role: 'Front-end Developer',
    mode: 'onsite', location: 'Melbourne', start: '2016-02', end: '2018-12',
    summary: 'Agency front-end developer for cultural, education and retail clients.',
    highlights: [
      { text: 'Delivered sites for galleries, councils and independent retailers.', metric: { value: '40+', label: 'launches' } },
      { text: "Introduced the studio's first shared component library and visual regression tests." },
    ],
    skillIds: ['css', 'design-systems', 'testing', 'typography', 'prototyping'],
  },
  {
    id: 'ledger-and-loom', organisation: 'Ledger & Loom', role: 'Junior Web Developer',
    mode: 'onsite', location: 'Melbourne', start: '2014-01', end: '2016-01',
    summary: 'First web hire at a small-business invoicing start-up.',
    highlights: [
      { text: 'Built the marketing site and the invoice template editor.' },
      { text: 'Moved the team from FTP deploys to reviewed, automated releases.', metric: { value: '3×', label: 'release frequency' } },
    ],
    skillIds: ['css', 'javascript', 'prototyping'],
  },
];

export const skills: Skill[] = [
  { id: 'typescript', label: 'TypeScript', group: 'engineering', level: 5, since: 2017 },
  { id: 'javascript', label: 'JavaScript', group: 'engineering', level: 5, since: 2014 },
  { id: 'react', label: 'React', group: 'engineering', level: 5, since: 2016 },
  { id: 'css', label: 'CSS & layout', group: 'engineering', level: 5, since: 2014 },
  { id: 'web-performance', label: 'Web performance', group: 'engineering', level: 4, since: 2018 },
  { id: 'testing', label: 'Testing & CI', group: 'engineering', level: 4, since: 2016 },
  { id: 'design-systems', label: 'Design systems', group: 'design', level: 5, since: 2017 },
  { id: 'accessibility', label: 'Accessibility (WCAG 2.2)', group: 'design', level: 5, since: 2019 },
  { id: 'typography', label: 'Typography for screens', group: 'design', level: 4, since: 2014 },
  { id: 'prototyping', label: 'Prototyping', group: 'design', level: 4, since: 2014 },
  { id: 'technical-strategy', label: 'Technical strategy', group: 'leadership', level: 4, since: 2022 },
  { id: 'mentoring', label: 'Mentoring & hiring', group: 'leadership', level: 4, since: 2020 },
];

export const work: Work[] = [
  {
    id: 'signal-design-system', title: 'Signal design system', year: 2023,
    experienceId: 'harbourline-transit', role: 'Lead and first contributor',
    outcome: 'Tokens, components and docs adopted by six teams in nine months.',
    skillIds: ['design-systems', 'typescript', 'react'],
  },
  {
    id: 'live-departures-board', title: 'Live departures board', year: 2024,
    experienceId: 'harbourline-transit', role: 'Front-end lead',
    outcome: 'Accessible, high-contrast departures for 220 station screens and the web.',
    skillIds: ['accessibility', 'web-performance', 'typescript', 'react'],
  },
  {
    id: 'quillfeather-reader', title: 'Quillfeather reader', year: 2020,
    experienceId: 'quillfeather', role: 'Engineer, reader team',
    outcome: 'Paginated e-reader with adjustable typesetting and full keyboard and screen-reader support.',
    skillIds: ['accessibility', 'typography', 'typescript', 'react', 'web-performance'],
  },
  {
    id: 'harbour-museum-site', title: 'Harbour Museum website', year: 2017,
    experienceId: 'northgate-studio', role: 'Front-end developer',
    outcome: 'Collection search and exhibition pages, built mobile-first for gallery visitors.',
    skillIds: ['css', 'typography', 'testing', 'prototyping'],
  },
];

export const education: Education[] = [
  { id: 'yarra-polytechnic-bdes', institution: 'Yarra Polytechnic', credential: 'Bachelor of Design (Communication Design)', start: '2010-02', end: '2013-11' },
];

export const credits: Credit[] = [
  { id: 'web-a11y-specialist', kind: 'certification', title: 'Web accessibility specialist', issuer: 'Inclusive Web Institute', year: 2021 },
  { id: 'tokens-all-the-way-down', kind: 'talk', title: 'Tokens all the way down', issuer: 'Fieldwork Front-end Meetup', year: 2023 },
  { id: 'fast-by-default', kind: 'talk', title: 'Fast by default: static first for transit data', issuer: 'Southbank Web Conference', year: 2024 },
];
