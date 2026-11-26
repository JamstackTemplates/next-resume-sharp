/** Convert a validated YYYY-MM to a continuous month index. */
export function monthIndex(month: string): number {
  return Number(month.slice(0, 4)) * 12 + Number(month.slice(5)) - 1;
}

type CareerRole = { id: string; organisation: string; start: string; end: string | null };

/** Half-open ranges keep a role visible even when it ends in the month it starts. */
export function careerRule(roles: readonly CareerRole[], currentMonth: string) {
  const present = monthIndex(currentMonth);
  const earliest = Math.min(present, ...roles.map(role => monthIndex(role.start)));
  const first = Math.floor(earliest / 12) * 12;
  const last = present + 1;
  const position = (month: number) => (Math.min(last, Math.max(first, month)) - first) / (last - first);
  const ticks = [];
  for (let month = first; month < last; month += 3) {
    ticks.push({ position: position(month), year: month % 12 === 0 ? month / 12 : null });
  }
  return {
    ticks,
    brackets: [...roles].reverse().map(role => {
      const start = Math.min(monthIndex(role.start), last - 1);
      const end = role.end ? monthIndex(role.end) + 1 : last;
      return {
        id: role.id, label: role.organisation, current: role.end === null,
        start: position(start), end: position(Math.max(start + 1, end)),
      };
    }),
  };
}

export type CareerRuleData = ReturnType<typeof careerRule>;
