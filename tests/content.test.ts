import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { credits, education, experience, profile, skills, work, type Experience } from '../content/resume.ts';
import { careerRule } from '../lib/career-rule.ts';
import { experienceYears, validateResume } from '../lib/resume-data.ts';
import { jsonLd, profileStructuredData } from '../lib/structured-data.ts';
import { workingTime } from '../lib/working-time.ts';

const sample = { profile, experience, skills, work, education, credits };

test('public contact details and sample résumé are valid', () => {
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.match(business.phone.replace(/\s/g, ''), /^\+[1-9]\d{7,14}$/, 'business.phone: valid international number required');
  assert.ok(business.enquiries.replyTime.trim(), 'business.enquiries.replyTime: required');
  assert.ok(business.enquiries.description.trim(), 'business.enquiries.description: required');
  validateResume(sample);
  assert.equal(experienceYears(experience, '2026-11'), 12);
});

test('common owner edits keep a single current role and accept metrics and skill changes', () => {
  const edited = structuredClone(sample);
  edited.profile.availability = { status: 'selective', from: '2027-04', label: 'Considering accessibility leadership roles' };
  edited.experience[0].end = '2026-10';
  const newRole: Experience = {
    id: 'new-role', organisation: 'Another Company', role: 'Principal Engineer', location: 'Melbourne',
    mode: 'hybrid', start: '2026-11', end: null, summary: 'Leading the design platform.',
    highlights: [{ text: 'Released the new component library.', metric: { value: '4', label: 'teams using it' } }],
    skillIds: ['design-systems'],
  };
  edited.experience.unshift(newRole);
  edited.skills[0].level = 4;
  validateResume(edited, 2026);
});

test('validation names the item when dates, IDs, skill references or print limits fail', () => {
  const [current, older, ...rest] = experience;
  const roles = (first: Experience, second = older) => ({ ...sample, experience: [first, second, ...rest] });
  assert.throws(() => validateResume(roles({ ...current, start: '2022-13' })), /experience\.harbourline-transit\.start/);
  assert.throws(() => validateResume(roles({ ...current, end: '2022-02' })), /experience\.harbourline-transit\.end/);
  assert.throws(() => validateResume(roles(current, { ...older, end: null })), /experience\.quillfeather\.end.*harbourline-transit/);
  assert.throws(() => validateResume(roles({ ...current, id: 'bad slug' })), /experience\.bad slug: ID/);
  assert.throws(() => validateResume(roles(current, current)), /experience\.harbourline-transit: duplicate ID/);
  assert.throws(() => validateResume(roles({ ...current, skillIds: ['missing-skill'] })), /harbourline-transit\.skillIds.*missing-skill/);
  assert.throws(() => validateResume(roles({ ...current, highlights: [...current.highlights, { text: 'Extra highlight' }] })), /harbourline-transit\.highlights/);
  assert.throws(() => validateResume(roles({ ...current, highlights: [{ text: 'x'.repeat(201) }] })), /harbourline-transit\.highlights\[1\]\.text/);
  assert.throws(() => validateResume({ ...sample, work: [{ ...work[0], experienceId: 'missing-role' }] }), /signal-design-system\.experienceId.*missing-role/);
  assert.throws(() => validateResume({ ...sample, work: [{ ...work[0], outcome: 'x'.repeat(161) }] }), /signal-design-system\.outcome/);
  const extraWork = { ...work[0], id: 'fifth-item' };
  assert.throws(() => validateResume({ ...sample, work: [...work, extraWork] }), /work\.fifth-item: exceeds the print limit/);
  const extraRoles = [{ ...older, id: 'fifth-role' }, { ...older, id: 'sixth-role' }];
  assert.throws(() => validateResume({ ...sample, experience: [...experience, ...extraRoles] }), /experience\.sixth-role: exceeds the print limit/);
  assert.throws(() => validateResume({ ...sample, skills: [{ ...skills[0], level: 4.5 }] }), /skills\.typescript\.level/);
  assert.throws(() => validateResume({ ...sample, skills: [{ ...skills[0], since: 2009 }] }), /skills\.typescript\.since/);
  assert.throws(() => validateResume({ ...sample, skills: [{ ...skills[0], since: 2027 }] }, 2026), /skills\.typescript\.since/);
  assert.throws(() => validateResume({ ...sample, profile: { ...profile, availability: { ...profile.availability, from: '2027-00' } } }), /profile\.availability\.from/);
  assert.throws(() => validateResume({ ...sample, profile: { ...profile, workingHours: { ...profile.workingHours, close: '09:00' } } }), /profile\.workingHours/);
});

test('career brackets use inclusive months and the ruler spans from the earliest year to the current year', () => {
  const data = careerRule(experience, '2026-11');
  assert.deepEqual(data.ticks.filter(tick => tick.year).map(tick => tick.year), Array.from({ length: 13 }, (_, n) => 2014 + n));
  assert.equal(data.ticks[1].position, 3 / 155);
  const [first, second, third, current] = data.brackets;
  assert.equal(first.start, 0);
  assert.equal(first.end, 25 / 155);
  assert.equal(second.start, first.end);
  assert.equal(third.end, current.start);
  assert.equal(current.end, 1);
  assert.equal(current.current, true);
  const latest = careerRule([{ ...experience[0], start: '2026-11', end: '2026-11' }], '2026-11').brackets[0];
  assert.ok(latest.start < latest.end);
  assert.equal(latest.end, 1);
  assert.equal(latest.current, false);
});

test('Melbourne working hours include 09:00 and exclude 17:30, with AEST and AEDT changeovers', () => {
  const working = (utc: string) => workingTime(profile.workingHours, profile.timeZone, new Date(utc));
  for (const [utc, time, withinHours] of [
    ['2026-04-06T22:59Z', '08:59', false],
    ['2026-04-06T23:00Z', '09:00', true],
    ['2026-04-07T07:29Z', '17:29', true],
    ['2026-04-07T07:30Z', '17:30', false],
    ['2026-04-11T00:00Z', '10:00', false],
  ] as const) assert.deepEqual(working(utc), { time, withinHours, zone: 'AEST' });
  assert.deepEqual(working('2026-04-04T15:59Z'), { time: '02:59', zone: 'AEDT', withinHours: false });
  assert.deepEqual(working('2026-04-04T16:00Z'), { time: '02:00', zone: 'AEST', withinHours: false });
  assert.deepEqual(working('2026-10-03T15:59Z'), { time: '01:59', zone: 'AEST', withinHours: false });
  assert.deepEqual(working('2026-10-03T16:00Z'), { time: '03:00', zone: 'AEDT', withinHours: false });
});

test('ProfilePage JSON-LD uses public résumé data and escapes inline script content', () => {
  const schema = profileStructuredData();
  assert.equal(schema['@type'], 'ProfilePage');
  assert.equal(schema.mainEntity['@type'], 'Person');
  assert.equal(schema.mainEntity.name, profile.name);
  assert.equal(schema.mainEntity.email, business.email);
  assert.deepEqual(schema.mainEntity.knowsAbout, skills.map(skill => skill.label));
  assert.equal(schema.mainEntity.worksFor?.name, experience.find(role => role.end === null)?.organisation);
  assert.deepEqual(Object.keys(schema.mainEntity.address), ['@type', 'addressLocality', 'addressRegion', 'addressCountry']);
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
