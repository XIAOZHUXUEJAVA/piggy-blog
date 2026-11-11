const timeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Shanghai',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

const weekdayFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Shanghai',
  weekday: 'short',
});

export function lifeClock(now: Date) {
  const weekday = weekdayFormat.format(now);
  return {
    time: timeFormat.format(now),
    isWeekend: weekday === 'Sat' || weekday === 'Sun',
  };
}
