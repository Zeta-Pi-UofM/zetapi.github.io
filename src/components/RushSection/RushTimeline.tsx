import React, { useEffect, useRef } from "react";
import styles from "./RushTimeline.module.css";

interface RushEvent {
  title: string;
  date: string; // ISO format: YYYY-MM-DD
  location?: string;
  time?: string;
}

const events: RushEvent[] = [
  {
    title: "Info Session #1",
    date: "2026-09-03",
    time: "6–8 PM",
    location: "NUB 1528",
  },
  {
    title: "Info Session #2",
    date: "2026-09-08",
    time: "6–8 PM",
    location: "NUB 2548",
  },
  {
    title: "Lemonade Stand",
    date: "2026-09-09",
    time: "6–8 PM",
    location: "The Cube",
  },
  {
    title: "DEI Panel",
    date: "2026-09-11",
    time: "5–7 PM ",
    location: "AH G115",
  },
  {
    title: "Application Due",
    date: "2026-09-12",
    time: "11:59 PM",
  },
];

function formatEventDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

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
                    <span className={styles.metaText}>{event.location}</span>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RushTimeline;
