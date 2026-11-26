import type { WorkingHours } from '../content/resume.ts';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const clock = /^([01]\d|2[0-3]):[0-5]\d$/;

export function validateWorkingHours(hours: WorkingHours) {
  if (!hours.days.length || hours.days.some(day => !Number.isInteger(day) || day < 1 || day > 7) ||
      new Set(hours.days).size !== hours.days.length) {
    throw new Error('profile.workingHours.days: use distinct ISO weekdays (1–7)');
  }
  if (!clock.test(hours.open) || !clock.test(hours.close) || hours.close <= hours.open) {
    throw new Error('profile.workingHours: use HH:MM with close after open on the same day');
  }
}

export function workingTime(hours: WorkingHours, timeZone: string, now: Date) {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZoneName: 'short',
  }).formatToParts(now);
  const value = (key: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === key)!.value;
  const time = `${value('hour')}:${value('minute')}`;
  const localDay = weekdays.indexOf(value('weekday')) + 1;
  return {
    time, zone: value('timeZoneName'),
    withinHours: hours.days.includes(localDay) && hours.open <= time && time < hours.close,
  };
}
