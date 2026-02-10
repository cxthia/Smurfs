// CalendarService.ts
// Mock Google Calendar integration for hackathon demo
// Fetches busy times and infers free windows, summarizes with AI

export type CalendarEvent = {
  start: string;
  end: string;
  summary: string;
};

// Mock calendar data
const mockEvents: CalendarEvent[] = [
  { start: '2026-02-10T09:00:00', end: '2026-02-10T10:00:00', summary: 'Meeting' },
  { start: '2026-02-10T12:00:00', end: '2026-02-10T13:00:00', summary: 'Lunch' },
  { start: '2026-02-10T15:00:00', end: '2026-02-10T16:00:00', summary: 'Call' },
];

export async function fetchBusyTimes() {
  // In real app, fetch from Google Calendar API
  return mockEvents;
}

export function inferFreeWindows(events: CalendarEvent[]) {
  // Simple logic: find gaps between events
  const freeWindows = [];
  let lastEnd = '2026-02-10T08:00:00';
  for (const event of events) {
    if (event.start > lastEnd) {
      freeWindows.push({ start: lastEnd, end: event.start });
    }
    lastEnd = event.end;
  }
  // Add evening free window
  freeWindows.push({ start: lastEnd, end: '2026-02-10T22:00:00' });
  return freeWindows;
}

export function summarizeAvailability(freeWindows: { start: string; end: string }[]) {
  // Use AI to summarize (mock for demo)
  return `You have free time at: ${freeWindows.map(w => `${w.start.split('T')[1]}-${w.end.split('T')[1]}`).join(', ')}`;
}
