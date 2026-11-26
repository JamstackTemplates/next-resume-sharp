'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { WorkingHours } from '../content/resume';
import { workingTime } from '../lib/working-time';

export function LocalTime({ hours, zone, children }: { hours: WorkingHours; zone: string; children: ReactNode }) {
  const [local, setLocal] = useState<ReturnType<typeof workingTime>>();
  useEffect(() => {
    const update = () => setLocal(workingTime(hours, zone, new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [hours, zone]);
  return local ? <><time>{local.time}</time> {local.zone}<br/>
    <span className="text-muted">{local.withinHours ? 'Within working hours' : 'Outside working hours'}</span></> : children;
}
