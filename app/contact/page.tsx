import type { Metadata } from 'next';
import { business } from '../../content/business';
import { experience, profile } from '../../content/resume';
import { ChecklistItem, ContactLayout, ContactLink, EnquiryDetails, EnquirySheet } from '../../components/contact-layout';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { LocalTime } from '../../components/local-time';
import { PageHead, PageHeading, PageIntroduction } from '../../components/page-head';
import { ProofIcon } from '../../components/proof-art';
import { absoluteUrl } from '../../lib/paths';
import { careerRule } from '../../lib/career-rule';
import { currentMonth } from '../../lib/resume-data';
import { site } from '../../lib/site';
import { socialImage } from '../../lib/social-image';

export const metadata: Metadata = {
  title: 'Contact', description: business.enquiries.description,
  alternates: { canonical: absoluteUrl('/contact/') },
  openGraph: {
    type: 'website', locale: 'en_AU', siteName: site.name, title: `Contact — ${profile.name}`,
    description: business.enquiries.description, url: absoluteUrl('/contact/'),
    ...(socialImage ? { images: [socialImage] } : {}),
  },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const zone = site.timeZone || profile.timeZone;
  return <>
    <PageHead data={careerRule(experience, currentMonth(zone))}>
      <PageHeading>Send an enquiry</PageHeading>
      <PageIntroduction>Tell me about the role or project. I read every message and reply within two working days, Melbourne time. Sending an enquiry doesn’t book an interview or confirm any engagement. We’ll arrange that together by email.</PageIntroduction>
    </PageHead>
    <ContactLayout>
      <EnquiryDetails>
        <h2 id="checklist-heading" className="condensed text-2xl uppercase">What to include</h2>
        <ol className="checklist mt-2 text-sm md:text-base">
          <ChecklistItem>The company, team and role title, or the project or event</ChecklistItem>
          <ChecklistItem>Location and working pattern, such as hybrid in Melbourne or remote with time-zone overlap</ChecklistItem>
          <ChecklistItem>Rough timeline and start date</ChecklistItem>
          <ChecklistItem>Salary band or day rate, if known</ChecklistItem>
          <ChecklistItem>Where you found this résumé</ChecklistItem>
        </ol>
        <h2 className="condensed mt-6 text-xl uppercase">Contact details</h2>
        <div className="mt-2 grid gap-2 text-sm font-medium md:text-base">
          <ContactLink email={business.email}/><ContactLink phone={business.phone}/>
        </div>
        <div className="mt-5 flex items-start gap-2.5 text-sm">
          <ProofIcon name="clock" className="mt-0.5 shrink-0 text-accent-ink"/>
          <div>
            <p className="font-semibold">{business.enquiries.replyTime}</p>
            <p className="mt-1 font-mono text-xs"><LocalTime hours={profile.workingHours} zone={zone}>
              {profile.location.locality}, {profile.location.country} (AET)
            </LocalTime></p>
          </div>
        </div>
      </EnquiryDetails>
      <EnquirySheet>
        <div className="flex items-start justify-between gap-3 border-b border-line pb-4">
          <h2 id="enquiry-heading" className="condensed text-3xl leading-none uppercase">
            {hosted ? 'Your message' : 'Email your enquiry'}
          </h2>
          <ProofIcon name="target" className="shrink-0 text-accent-ink"/>
        </div>
        <div className="pt-5">
          {hosted ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email}/>
            : <>
              <p className="mb-5 max-w-[48ch] text-muted">For role enquiries, contract or advisory work, or a speaking invitation, send me a note by email.</p>
              <div className="flex flex-wrap items-center gap-3">
                <a className="button" href={`mailto:${business.email}`}><ProofIcon name="email" className="size-4"/>Open email app</a>
                <CopyEmail email={business.email}/>
              </div>
            </>}
        </div>
      </EnquirySheet>
    </ContactLayout>
  </>;
}
