import React, { useEffect, useRef } from "react";
import styles from "./RushTimeline.module.css";
import { buildGoogleCalendarUrl } from "../../utils/calendar";
import { parseLocation, REGISTRAR_LOCATIONS_URL } from "../../utils/locations";

interface RushEvent {
  title: string;
  date: string; // ISO format: YYYY-MM-DD
  location?: string;
  time?: string; // display text
  startTime?: string; // 24-hour "HH:MM" — powers the calendar link
  endTime?: string; // 24-hour "HH:MM"
}

const events: RushEvent[] = [
  {
    title: "Info Session #1",
    date: "2026-09-03",
    time: "6–8 PM",
    startTime: "18:00",
    endTime: "20:00",
    location: "NUB 1528",
  },
  {
    title: "Info Session #2",
    date: "2026-09-08",
    time: "6–8 PM",
    startTime: "18:00",
    endTime: "20:00",
    location: "NUB 2548",
  },
  {
    title: "Lemonade Stand",
    date: "2026-09-09",
    time: "6–8 PM",
    startTime: "18:00",
    endTime: "20:00",
    location: "The Cube",
  },
  {
    title: "DEI Panel",
    date: "2026-09-11",
    time: "5–7 PM ",
    startTime: "17:00",
    endTime: "19:00",
    location: "AH G115",
  },
  {
    title: "Application Due",
    date: "2026-09-12",
    time: "11:59 PM",
    // no startTime → all-day calendar entry
  },
];

function formatEventDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

// Links a recognized building abbreviation (e.g. "NUB" in "NUB 1528") to the
// Registrar's location reference; renders the raw string otherwise.
const EventLocation: React.FC<{ location: string }> = ({ location }) => {
  const parsed = parseLocation(location);
  if (!parsed) {
    return <span className={styles.metaText}>{location}</span>;
  }
  return (
    <span className={styles.metaText}>
      <a
        href={REGISTRAR_LOCATIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        title={parsed.buildingName}
        className={styles.metaLink}
      >
        {parsed.abbrev}
      </a>
      {parsed.rest ? ` ${parsed.rest}` : ""}
    </span>
  );
};

const RushTimeline: React.FC = () => {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const todayIso = new Date().toISOString().slice(0, 10);
  const upcomingIndex = events.reduce<number>((soonestIdx, event, idx) => {
    if (event.date < todayIso) return soonestIdx;
    if (soonestIdx === -1 || event.date < events[soonestIdx].date) return idx;
    return soonestIdx;
  }, -1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.timelineItemVisible);
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      { threshold: 0.2 }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.timelineSection}>
      <h2 className={styles.heading}>Fall 2026 Rush Timeline</h2>
      <div className={styles.timeline}>
        {events.map((event, idx) => (
          <div
            key={`${event.title}-${idx}`}
            ref={(el: HTMLDivElement | null) => {
              itemsRef.current[idx] = el; // ✅ Type-safe, returns void
            }}
            className={`${styles.timelineItem} ${
              idx % 2 === 0 ? styles.left : styles.right
            } ${idx === upcomingIndex ? styles.upcoming : ""}`}
          >
            <div className={styles.content}>
              {idx === upcomingIndex && (
                <span className={styles.upcomingBadge}>Upcoming</span>
              )}
              <h3 className={styles.title}>{event.title}</h3>
              <div className={styles.stack}>
                {/* Date */}
                <div className={styles.metaRow}>
                  <svg className={styles.metaIcon} viewBox="0 0 24 24">
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="3"
                      y1="10"
                      x2="21"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className={styles.dateText}>{formatEventDate(event.date)}</span>
                </div>

                {/* Location */}
                {event.location && (
                  <div className={styles.metaRow}>
                    <svg className={styles.metaIcon} viewBox="0 0 24 24">
                      <path
                        d="M12 22s7-6.236 7-11a7 7 0 1 0-14 0c0 4.764 7 11 7 11Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="11"
                        r="3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <EventLocation location={event.location} />
                  </div>
                )}

                {/* Time */}
                {event.time && (
                  <div className={styles.metaRow}>
                    <svg className={styles.metaIcon} viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 6v6l4 2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={styles.metaText}>{event.time}</span>
                  </div>
                )}

                {/* Add to calendar */}
                <a
                  className={`${styles.metaRow} ${styles.calendarLink}`}
                  href={buildGoogleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className={styles.metaIcon} viewBox="0 0 24 24">
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="3"
                      y1="10"
                      x2="21"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="12"
                      y1="13"
                      x2="12"
                      y2="19"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="9"
                      y1="16"
                      x2="15"
                      y2="16"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className={styles.metaText}>Add to Google Calendar</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RushTimeline;
