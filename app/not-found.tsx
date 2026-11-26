import { MissingProof, ProofIcon } from '../components/proof-art';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return <section className="wrap max-w-3xl pt-10 pb-14 text-center md:pt-14 md:pb-20">
    <MissingProof/>
    <p className="technical mt-4 text-accent-ink">Not in this proof</p>
    <h1 className="expanded mx-auto mt-2 max-w-[16ch] text-[clamp(2.25rem,6vw,4.85rem)] leading-[.99] tracking-[-.04em] [word-spacing:.04em]">
      This page didn’t make the final proof
    </h1>
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <SiteLink href="/" className="button"><ProofIcon name="arrow" className="size-4 rotate-180"/>Back to résumé</SiteLink>
      <SiteLink href="/contact/" className="button button-quiet">Contact</SiteLink>
    </div>
  </section>;
}
