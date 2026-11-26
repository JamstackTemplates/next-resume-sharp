import { profile } from '../content/resume';
import { site } from './site';

export const socialImage = site.url ? {
  url: `${site.url}/og.png`, width: 1200, height: 630,
  alt: `${profile.name}, ${profile.title} in ${profile.location.locality}, with a career ruler`,
} : undefined;
