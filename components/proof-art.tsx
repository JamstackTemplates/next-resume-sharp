import type { ReactNode } from 'react';
import type { CareerRuleData } from '../lib/career-rule';

const icons = {
  target: <><circle cx="10" cy="10" r="5.75"/><path d="M10 1v5m0 8v5M1 10h5m8 0h5"/><circle cx="10" cy="10" r="1.2" fill="currentColor" stroke="none"/></>,
  email: <><path d="M2 5h16v11H2zM2 5l8 6 8-6M2 16l5-5m11 5-5-5"/></>,
  phone: <path d="m4 2 4 3-2 3 6 6 3-2 3 4-3 2C8 17 3 12 2 5z"/>,
  location: <><path d="M10 18s-6-5-6-10a6 6 0 1 1 12 0c0 5-6 10-6 10z"/><path d="M7 8h6m-3-3v6"/></>,
  clock: <><circle cx="10" cy="10" r="7.5"/><path d="M10 5v5l3 2"/></>,
  print: <path d="M5 7V2h10v5M5 14H2V7h16v7h-3m-10-3h10v7H5zm9-2h2"/>,
  pdf: <path d="M4 2h8l4 4v12H4zm8 0v4h4m-6 2v7m-3-3 3 3 3-3"/>,
  arrow: <path d="M3 10h14m-5-5 5 5-5 5"/>,
  external: <path d="M11 3h6v6m0-6L8 12m0-8H3v13h13v-5"/>,
  caret: <path d="m5 12 5-7 5 7"/>,
  stet: <><path d="M3 7h14"/><path d="M4 13h1m4 0h2m4 0h1" strokeWidth="2"/></>,
  delete: <path d="M2 12h11c7 0 5-9 0-8s-2 8 4 12"/>,
} satisfies Record<string, ReactNode>;

export function ProofIcon({ name, className }: { name: keyof typeof icons; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" className={className}
    fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="miter">{icons[name]}</svg>;
}

export function Crops() {
  return <span className="crops" aria-hidden="true">{[0, 1, 2, 3].map(corner =>
    <svg key={corner} viewBox="0 0 18 18"><path d="M.75 18V.75H18" fill="none" stroke="currentColor" strokeWidth="1.25"/></svg>,
  )}</span>;
}

export function RegistrationDivider({ label }: { label?: string }) {
  return <div aria-hidden="true" className="screen-only flex items-center gap-3 text-accent-ink">
    <span className="h-px grow bg-line"/>
    <span className="flex items-center gap-2 font-mono text-[.65rem] tracking-[.12em] text-muted uppercase">
      <ProofIcon name="target" className="size-4 text-accent-ink"/>
      {label && <span>{label}</span>}
    </span>
    <span className="h-px grow bg-line"/>
  </div>;
}

export function ColorCalibrationBar() {
  return <span className="color-bars" aria-hidden="true">
    <span style={{ background: 'var(--primary)' }}/>
    <span style={{ background: 'var(--highlight)' }}/>
    <span style={{ background: 'var(--steel)' }}/>
    <span style={{ background: 'var(--ink)' }}/>
  </span>;
}

function Registration({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size})`} stroke="currentColor" fill="none">
    <circle r="13"/><circle r="7"/><path d="M-21 0h42M0-21v42"/>
  </g>;
}

export function MiniCareerRule({ data, labels = false }: { data: CareerRuleData; labels?: boolean }) {
  const x = (position: number) => 12 + position * 476;
  return <svg aria-hidden="true" viewBox="0 0 500 48" fill="none" className="block w-full" strokeWidth="1.25">
    <rect x=".625" y=".625" width="498.75" height="46.75" fill="var(--ruler-bg)" stroke="var(--ruler-border)"/>
    <path d="M12 18h476" stroke="var(--ruler-ink)" opacity=".45"/>
    {data.ticks.map(tick => <g key={tick.position} transform={`translate(${x(tick.position)})`}>
      <path d={tick.year ? 'M0 7v11' : 'M0 13v5'} stroke="var(--ruler-ink)" opacity={tick.year ? '.75' : '.45'}/>
      {labels && tick.year && <text x="2" y="43" fill="var(--ruler-ink)" fontSize="8" className="font-mono">{tick.year}</text>}
    </g>)}
    {data.brackets.map(bracket => <path key={bracket.id} stroke="var(--mark)" strokeWidth="2"
      d={`M${x(bracket.start) + 1} 25v8H${x(bracket.end) - 1}${bracket.current ? 'm-4 -4 4 4-4 4' : 'v-8'}`}/>)}
  </svg>;
}

export function ProofBench({ data }: { data: CareerRuleData }) {
  return <div className="bench-art" aria-hidden="true">
    <svg viewBox="0 0 650 530" className="block" fill="none" strokeWidth="1.25">
      <defs>
        <pattern id="bench-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0H0v12" stroke="var(--steel)" opacity=".22"/>
        </pattern>
        <pattern id="bench-major" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0H0v60" stroke="var(--steel)" opacity=".55"/>
        </pattern>
        <filter id="bench-grain"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" stitchTiles="stitch"/></filter>
      </defs>
      <path d="M121 64H617V471H121z" fill="var(--mat)" stroke="var(--steel)" opacity=".76"/>
      <path d="M121 64H617V471H121z" fill="url(#bench-grid)"/>
      <path d="M121 64H617V471H121z" fill="url(#bench-major)"/>
      <path d="M121 88v383h496" stroke="var(--steel)"/>
      {[0, 1, 2, 3, 4, 5, 6, 7].map(n => <g key={n} transform={`translate(${145 + n * 60} 65)`}>
        <path d="M0 0v8" stroke="var(--steel)"/>
        <text x="3" y="17" fill="var(--muted)" fontSize="10" className="font-mono">{String(n * 10).padStart(2, '0')}</text>
      </g>)}
      <g className="bench-sheet">
        <g transform="rotate(-3 327 255)">
          <rect x="171" y="41" width="315" height="402" fill="#000" opacity=".12"/>
          <rect x="161" y="31" width="315" height="402" fill="var(--sheet)" stroke="var(--steel)"/>
          <rect x="162" y="32" width="313" height="400" filter="url(#bench-grain)" opacity=".045"/>
          <path d="M150 53h35m-3-35v39m272-39v39m-3-4h35M150 411h35m-3-4v39m272-39v39m-3-35h35" stroke="var(--steel)"/>
          <path d="M196 83h244M196 363h244" stroke="var(--steel)"/>
          <text x="196" y="72" fill="var(--muted)" fontSize="10" className="font-mono">I. CALDER / GALLEY PROOF</text>
          <text x="436" y="72" fill="var(--muted)" fontSize="10" textAnchor="end" className="font-mono">01</text>
          <path d="M198 111h120v15H198zm0 23h175v15H198z" fill="var(--ink)"/>
          <path d="M197 168h111m-111 16h214m-214 11h238m-238 11h180" stroke="var(--steel)"/>
          <path d="m197 187 219-2-5 12-214 3z" fill="var(--highlight)"/>
          <path d="M197 194h216M196 231h244M240 246h192m-192 12h179m-179 11h195m-195 11h153M196 304h244M240 320h174m-174 12h196m-196 11h159" stroke="var(--steel)"/>
          <path d="M196 247h28m-28 7h20m-20 67h28m-28 7h20" stroke="var(--ink)"/>
          <g className="text-steel"><Registration x={318} y={389} size={.54}/></g>
        </g>
      </g>
      <g className="bench-steel">
        <g transform="translate(76 338) rotate(10)">
          <rect x="4" y="8" width="510" height="58" fill="#000" opacity=".16"/>
          <rect width="510" height="58" fill="var(--steel)" stroke="var(--steel-text)"/>
          <path d="M0 5h510M0 53h510" stroke="var(--steel-text)" opacity=".55"/>
          <path d="M13 20h464" stroke="var(--steel-text)" opacity=".7"/>
          {data.ticks.map(tick => <g key={tick.position} transform={`translate(${13 + tick.position * 464})`}>
            <path d={tick.year ? 'M0 5v15' : 'M0 12v8'} stroke="var(--steel-text)"/>
            {tick.year && tick.year % 2 === 0 && <text x="2" y="30" fill="var(--steel-text)" fontSize="8" className="font-mono">{tick.year}</text>}
          </g>)}
          {data.brackets.map(b => <path key={b.id} d={`M${14 + b.start * 464} 39v8H${12 + b.end * 464}${b.current ? 'm-3 -3 3 3-3 3' : 'v-8'}`}
            stroke="var(--band)" strokeWidth="1.75"/>)}
          <circle cx="490" cy="29" r="6" fill="var(--mat)" stroke="var(--steel-text)"/>
        </g>
      </g>
      <g className="bench-pencil">
        <g transform="translate(538 97) rotate(19)">
          <path d="M5 4h17v219l-8.5 27L5 223z" fill="#000" opacity=".2"/>
          <path d="M0 0h17v219l-8.5 27L0 219z" fill="var(--mark)" stroke="var(--ink)"/>
          <path d="M0 219h17l-8.5 27z" fill="var(--sheet)" stroke="var(--ink)"/>
          <path d="m5.6 237 2.9 9 2.9-9z" fill="var(--mark)" stroke="var(--mark)"/>
          <path d="M5 11v208m7-208v208M0 9h17" stroke="var(--ink)" opacity=".65"/>
        </g>
      </g>
      <g className="text-steel"><Registration x={586} y={448} size={.8}/></g>
      <path d="M606 58h18v18m-18 401h18v-18M114 459v18h18" stroke="var(--ink)"/>
    </svg>
  </div>;
}

export function MissingProof() {
  return <svg aria-hidden="true" viewBox="0 0 480 260" className="mx-auto block w-full max-w-[29rem]" fill="none" strokeWidth="1.25">
    <path d="M26 24h427v211H26z" fill="var(--mat)" stroke="var(--steel)"/>
    {Array.from({ length: 19 }, (_, n) => <path key={n} d={`M${40 + n * 21} 24v211`} stroke="var(--mat-grid)"/>)}
    <defs>
      <filter id="missing-proof-grain"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" stitchTiles="stitch"/></filter>
      <clipPath id="missing-proof-cut"><path d="M111 40h245v127l-39 37H111z"/></clipPath>
    </defs>
    <g transform="rotate(-4 236 126)">
      <path d="M110 39h247v128l-40 38H110z" fill="var(--sheet)" stroke="var(--steel)"/>
      <rect x="110" y="39" width="247" height="166" clipPath="url(#missing-proof-cut)" filter="url(#missing-proof-grain)" opacity=".045"/>
      <path d="M317 205v-38h40M99 56h34m-6-27v32m-28 126h35m-7-4v34" stroke="var(--steel)"/>
      <path d="M143 72h70v10h-70zM143 91h108v10H143z" fill="var(--ink)"/>
      <path d="M143 120h170m-170 13h172m-172 13h152m-152 14h110" stroke="var(--steel)"/>
      <path d="M139 133h173c26 0 25-24 9-22-16 2-10 25 16 36" stroke="var(--mark)" strokeWidth="2"/>
      <g className="text-steel"><Registration x={283} y={177} size={.55}/></g>
    </g>
    <g transform="translate(185 189) rotate(8)">
      <rect width="245" height="41" fill="var(--ruler-bg)" stroke="var(--ruler-border)"/>
      {Array.from({ length: 23 }, (_, n) => <path key={n} d={`M${13 + n * 10} 0v${n % 5 === 0 ? 11 : 6}`} stroke="var(--ruler-ink)" opacity=".7"/>)}
      <text x="13" y="32" fill="var(--ruler-ink)" fontSize="20" className="font-mono">404 mm</text>
    </g>
  </svg>;
}
