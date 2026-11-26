import { business } from '../content/business.ts';
import { education, experience, profile, skills } from '../content/resume.ts';
import { absoluteUrl } from './paths.ts';

export function profileStructuredData() {
  const url = absoluteUrl('/');
  const currentRole = experience.find(role => role.end === null);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${profile.name} — Resume`,
    ...(url ? { url } : {}),
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.title,
      email: business.email,
      telephone: business.phone,
      ...(url ? { url } : {}),
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.location.locality,
        addressRegion: profile.location.region,
        addressCountry: profile.location.country,
      },
      knowsAbout: skills.map(skill => skill.label),
      alumniOf: education.map(entry => ({ '@type': 'EducationalOrganization', name: entry.institution })),
      ...(currentRole ? { worksFor: { '@type': 'Organization', name: currentRole.organisation } } : {}),
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
