import type { ReactNode } from 'react';
import type { CareerRuleData } from '../lib/career-rule';
import { ColorCalibrationBar, Crops, MiniCareerRule } from './proof-art';

export function PageHead({ children, data }: { children: ReactNode; data: CareerRuleData }) {
  return <header className="wrap grid gap-5 pt-9 pb-8 md:grid-cols-12 md:items-end md:pt-16 md:pb-11">
    <div className="proof-frame relative px-5 py-5 sm:px-7 md:col-span-8 md:py-7">
      <Crops/>
      <div aria-hidden="true" className="mb-3 flex items-center justify-between gap-2 font-mono text-[.66rem] tracking-[.09em] text-muted uppercase">
        <span>FOLIO 02 · DIRECT ENQUIRY</span>
        <ColorCalibrationBar/>
      </div>
      {children}
    </div>
    <div className="text-muted md:col-span-4 md:pb-2"><MiniCareerRule data={data} labels/></div>
  </header>;
}

export function PageHeading({ children }: { children: ReactNode }) {
  return <h1 className="expanded text-[clamp(2.7rem,6.7vw,6.3rem)] leading-[.9] tracking-[-.045em] [word-spacing:.04em]">{children}</h1>;
}

export function PageIntroduction({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-[63ch] text-base text-muted md:text-lg">{children}</p>;
}
