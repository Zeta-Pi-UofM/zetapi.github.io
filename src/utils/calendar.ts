// Builds "Add to Google Calendar" template URLs for Rush events.
// Events are Ann Arbor time; we pass wall-clock datetimes plus ctz=America/New_York
// so no UTC offset math is needed.

const EVENT_TZ = "America/New_York";
const DEFAULT_DURATION_HOURS = 2;

export interface CalendarEvent {
  title: string;
  date: string; // ISO calendar date: YYYY-MM-DD
  startTime?: string; // 24-hour "HH:MM"
  endTime?: string; // 24-hour "HH:MM"
  location?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// "2026-09-03" -> "20260903" (no Date parsing, avoids UTC off-by-one)
function compactDate(isoDate: string): string {
  return isoDate.replace(/-/g, "");
}

// next calendar day, as "YYYYMMDD" — Google's all-day end date is exclusive
function nextCompactDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const d = new Date(year, month - 1, day + 1);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

// "18:00" -> { h: 18, m: 0 }
function parseHhMm(value: string): { h: number; m: number } {
  const [h, m] = value.split(":").map(Number);
  return { h: h || 0, m: m || 0 };
}

function addHours(
  time: { h: number; m: number },
  hours: number
): { h: number; m: number } {
  return { h: (time.h + hours) % 24, m: time.m };
}

/**
 * Google Calendar "TEMPLATE" URL that prefills a new event.
 * Timed when `startTime` is set, otherwise an all-day entry.
 */
export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Zeta Pi: ${event.title}`,
  });

  if (event.startTime) {
    const start = parseHhMm(event.startTime);
    const end = event.endTime
      ? parseHhMm(event.endTime)
      : addHours(start, DEFAULT_DURATION_HOURS);
    const day = compactDate(event.date);
    const startStamp = `${day}T${pad(start.h)}${pad(start.m)}00`;
    const endStamp = `${day}T${pad(end.h)}${pad(end.m)}00`;
    params.set("dates", `${startStamp}/${endStamp}`);
    params.set("ctz", EVENT_TZ);
  } else {
    params.set(
      "dates",
      `${compactDate(event.date)}/${nextCompactDate(event.date)}`
    );
  }

  if (event.location) {
    params.set("location", event.location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
