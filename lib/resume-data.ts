import type { Credit, Education, Experience, Profile, Skill, Work } from '../content/resume.ts';
import { monthIndex } from './career-rule.ts';
import { validateWorkingHours } from './working-time.ts';

const month = /^(?!0000)\d{4}-(0[1-9]|1[0-2])$/;
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const monthLabel = new Intl.DateTimeFormat('en-AU', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function displayMonth(value: string) {
  return monthLabel.format(new Date(`${value}-01T00:00:00Z`));
}

export function currentMonth(timeZone: string, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-AU', { timeZone, month: '2-digit', year: 'numeric' }).formatToParts(now);
  return `${parts.find(part => part.type === 'year')!.value}-${parts.find(part => part.type === 'month')!.value}`;
}

export function experienceYears(roles: readonly Experience[], asOf: string) {
  const now = monthIndex(asOf);
  const earliest = Math.min(now, ...roles.map(role => monthIndex(role.start)));
  return Math.floor((now - earliest) / 12);
}

function required(fields: Record<string, string>, item: string) {
  for (const [name, value] of Object.entries(fields)) {
    if (typeof value !== 'string' || !value.trim()) throw new Error(`${item}.${name}: required`);
  }
}

function ids(collection: string, items: readonly { id: string }[], max = Infinity) {
  const seen = new Set<string>();
  items.forEach(({ id }, index) => {
    const item = `${collection}.${id || index + 1}`;
    if (typeof id !== 'string' || !slug.test(id)) throw new Error(`${item}: ID must be a lowercase URL-safe slug`);
    if (seen.has(id)) throw new Error(`${item}: duplicate ID`);
    if (index >= max) throw new Error(`${item}: exceeds the print limit of ${max} ${collection} entries`);
    seen.add(id);
  });
  return seen;
}

function dates(item: string, start: string, end: string | null) {
  if (!month.test(start)) throw new Error(`${item}.start: use YYYY-MM`);
  if (end === null) return;
  if (!month.test(end)) throw new Error(`${item}.end: use YYYY-MM`);
  if (end < start) throw new Error(`${item}.end: must be on or after start`);
}

export function validateResume(data: {
  profile: Profile; experience: readonly Experience[]; skills: readonly Skill[]; work: readonly Work[];
  education: readonly Education[]; credits: readonly Credit[];
}, year?: number) {
  const { profile, experience, skills, work, education, credits } = data;
  required({ name: profile.name, title: profile.title, pitch: profile.pitch, timeZone: profile.timeZone }, 'profile');
  required(profile.location, 'profile.location');
  required(profile.summary, 'profile.summary');
  try {
    new Intl.DateTimeFormat('en-AU', { timeZone: profile.timeZone });
  } catch {
    throw new Error('profile.timeZone: use an IANA time zone');
  }
  year ??= Number(currentMonth(profile.timeZone).slice(0, 4));
  validateWorkingHours(profile.workingHours);
  required({ label: profile.availability.label }, 'profile.availability');
  if (!['open', 'selective', 'closed'].includes(profile.availability.status)) throw new Error('profile.availability.status: use open, selective or closed');
  if (profile.availability.from !== null && !month.test(profile.availability.from)) throw new Error('profile.availability.from: use YYYY-MM or null');
  if (!profile.languages.length) throw new Error('profile.languages: add at least one language');
  profile.languages.forEach((language, i) => required(language, `profile.languages[${i + 1}]`));

  if (!experience.length) throw new Error('experience: add at least one role');
  const roleIds = ids('experience', experience, 5);
  const skillIds = ids('skills', skills);
  ids('work', work, 4);
  ids('education', education);
  ids('credits', credits);

  for (const skill of skills) {
    const item = `skills.${skill.id}`;
    required({ label: skill.label }, item);
    if (!['engineering', 'design', 'leadership'].includes(skill.group)) throw new Error(`${item}.group: use engineering, design or leadership`);
    if (!Number.isInteger(skill.level) || skill.level < 1 || skill.level > 5) throw new Error(`${item}.level: use an integer from 1 to 5`);
    if (!Number.isInteger(skill.since) || skill.since < 2010 || skill.since > year) throw new Error(`${item}.since: use a year from 2010 to ${year}`);
  }

  function skillReferences(item: string, values: readonly string[]) {
    if (!values.length) throw new Error(`${item}.skillIds: add at least one skill`);
    const seen = new Set<string>();
    for (const value of values) {
      if (!skillIds.has(value)) throw new Error(`${item}.skillIds: unknown skill "${value}"`);
      if (seen.has(value)) throw new Error(`${item}.skillIds: duplicate skill "${value}"`);
      seen.add(value);
    }
  }

  let currentRole: string | undefined;
  for (const [index, role] of experience.entries()) {
    const item = `experience.${role.id}`;
    required({ organisation: role.organisation, role: role.role, location: role.location, summary: role.summary }, item);
    if (!['onsite', 'hybrid', 'remote'].includes(role.mode)) throw new Error(`${item}.mode: use onsite, hybrid or remote`);
    dates(item, role.start, role.end);
    if (index > 0 && role.start > experience[index - 1].start) throw new Error(`${item}.start: order roles newest first`);
    if (role.end === null) {
      if (currentRole) throw new Error(`${item}.end: ${currentRole} is already current; only one role can have a null end`);
      currentRole = role.id;
    }
    if (role.highlights.length < 1 || role.highlights.length > 4) throw new Error(`${item}.highlights: use one to four highlights to fit print`);
    role.highlights.forEach(({ text, metric }, index) => {
      const place = `${item}.highlights[${index + 1}]`;
      required({ text }, place);
      if (text.length > 200) throw new Error(`${place}.text: use at most 200 characters`);
      if (metric) required({ value: metric.value, label: metric.label }, `${place}.metric`);
    });
    skillReferences(item, role.skillIds);
  }

  for (const project of work) {
    const item = `work.${project.id}`;
    required({ title: project.title, role: project.role, outcome: project.outcome }, item);
    if (!Number.isInteger(project.year) || project.year < 1900 || project.year > year) throw new Error(`${item}.year: use a valid past or current year`);
    if (!roleIds.has(project.experienceId)) throw new Error(`${item}.experienceId: unknown role "${project.experienceId}"`);
    if (project.outcome.length > 160) throw new Error(`${item}.outcome: use at most 160 characters`);
    skillReferences(item, project.skillIds);
  }
  for (const course of education) {
    const item = `education.${course.id}`;
    required({ institution: course.institution, credential: course.credential }, item);
    if (course.end === null) throw new Error(`${item}.end: use YYYY-MM`);
    dates(item, course.start, course.end);
  }
  for (const credit of credits) {
    const item = `credits.${credit.id}`;
    required({ title: credit.title, issuer: credit.issuer }, item);
    if (!['certification', 'talk'].includes(credit.kind)) throw new Error(`${item}.kind: use certification or talk`);
    if (!Number.isInteger(credit.year) || credit.year < 1900 || credit.year > year) throw new Error(`${item}.year: use a valid past or current year`);
  }
}
