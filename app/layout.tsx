import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { profile } from '../content/resume';
import { site } from '../lib/site';
import { socialImage } from '../lib/social-image';
import '@fontsource-variable/hubot-sans/wdth.css';
import '@fontsource-variable/geist';
import '@fontsource/source-code-pro/400.css';
import '@fontsource/source-code-pro/600.css';
import './tailwind.input.css';

export const metadata: Metadata = {
  title: { default: site.name, template: `%s — ${profile.name}` },
  description: site.description || profile.pitch,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website', locale: 'en_AU', siteName: site.name, title: site.name, url: site.url ? `${site.url}/` : undefined,
    description: site.description || profile.pitch, ...(socialImage ? { images: [socialImage] } : {}),
  },
  twitter: { card: 'summary_large_image', ...(socialImage ? { images: [socialImage] } : {}) },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-AU" suppressHydrationWarning>
    <head>
      <meta name="color-scheme" content="light dark"/>
      <ThemeScript/>
    </head>
    <body><ThemeProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader/><main id="main" tabIndex={-1}>{children}</main><SiteFooter/>
    </ThemeProvider></body>
  </html>;
}
