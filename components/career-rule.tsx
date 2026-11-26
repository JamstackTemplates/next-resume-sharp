import type { CareerRuleData } from '../lib/career-rule';

function labelLines(label: string, length: number) {
  const lines: string[] = [];
  for (const word of label.split(' ')) {
    const last = lines.at(-1);
    if (last && last.length + word.length < length) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}

export function CareerRule({ data }: { data: CareerRuleData }) {
  const y = (position: number) => 640 - 600 * position;
  const x = (position: number) => 14 + 332 * position;
  return <aside className="screen-only career-rule min-w-0 md:sticky md:top-24 md:self-start" aria-label="Career ruler">
    <svg aria-hidden="true" viewBox="0 0 163 672" className="hidden w-full max-w-45 md:block" fill="none" strokeWidth="1.25">
      <rect x="1" y="17" width="63" height="643" fill="var(--ruler-bg)" stroke="var(--ruler-border)"/>
      <path d="M5 18v642M60 18v642" stroke="var(--ruler-border)" opacity=".7"/>
      {data.ticks.map(tick => <g key={tick.position} transform={`translate(0 ${y(tick.position)})`}>
        <path d={tick.year ? 'M51 0h13' : 'M57 0h7'} stroke="var(--ruler-ink)" opacity={tick.year ? '.75' : '.45'}/>
        {tick.year && <text x="11" y="3.5" fill="var(--ruler-ink)" fontSize="11" className="font-mono">{tick.year}</text>}
      </g>)}
      {data.brackets.map(b => {
        const top = y(b.end) + 1;
        const bottom = y(b.start) - 1;
        const lines = labelLines(b.label, 15);
        return <g key={b.id}>
          <g className="career-bracket" data-rule-role={b.id} stroke="var(--mark)" strokeWidth="1.7">
            <path pathLength="1" d={`M79 ${bottom}H69V${top}${b.current ? 'm-4 5 4-5 4 5' : 'h10'}`}/>
          </g>
          <text className="career-label condensed uppercase" data-rule-role={b.id} x="85"
            y={(top + bottom) / 2 - (lines.length - 1) * 6 + 4} fill="currentColor" fontSize="12">
            {lines.map((line, index) => <tspan key={index} x="85" dy={index ? 13 : 0}>{line}</tspan>)}
          </text>
        </g>;
      })}
    </svg>
    <svg aria-hidden="true" viewBox="0 0 360 99" className="block w-full md:hidden" fill="none" strokeWidth="1.25">
      <rect x="1" y="3" width="358" height="32" fill="var(--ruler-bg)" stroke="var(--ruler-border)"/>
      <path d="M1 8h358" stroke="var(--ruler-border)" opacity=".7"/>
      {data.ticks.map(tick => <g key={tick.position} transform={`translate(${x(tick.position)} 34)`}>
        <path d={tick.year ? 'M0 0v-10' : 'M0 0v-5'} stroke="var(--ruler-ink)" opacity={tick.year ? '.75' : '.45'}/>
        {tick.year && (tick.year % 2 === 0 || data.ticks.filter(t => t.year).length < 6) &&
          <text x="1" y="-14" fill="var(--ruler-ink)" fontSize="9" className="font-mono">{tick.year}</text>}
      </g>)}
      {data.brackets.map((b, index) => {
        const left = x(b.start) + 1;
        const right = x(b.end) - 1;
        const center = (left + right) / 2;
        const lines = labelLines(b.label, 13);
        const lane = index % 2 * 13;
        return <g key={b.id}>
          <g className="career-bracket" data-rule-role={b.id} stroke="var(--mark)" strokeWidth="1.7">
            <path pathLength="1" d={`M${left} 39v8H${right}${b.current ? 'm-4 -4 4 4-4 4' : 'v-8'}`}/>
          </g>
          <text className="career-label condensed uppercase" data-rule-role={b.id} x={center}
            y={62 + lane} textAnchor="middle" fill="currentColor" fontSize="10.5">
            {lines.map((line, index) => <tspan key={index} x={center} dy={index ? 10 : 0}>{line}</tspan>)}
          </text>
        </g>;
      })}
    </svg>
  </aside>;
}
