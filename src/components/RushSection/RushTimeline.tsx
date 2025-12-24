import React, { useEffect, useRef } from "react";
import styles from "./RushTimeline.module.css";

interface RushEvent {
  title: string;
  date: string;
  location?: string;
  time?: string;
}

const events: RushEvent[] = [
  {
    title: "North Campus Festifall",
    date: "TBD",
    location: "TBD",
    time: "TBD",
  },
  {
    title: "Central Campus Festifall",
    date: "TBD",
    location: "TBD",
    time: "TBD",
  },
  {
    title: "Info Session #1",
    date: "TBD",
    location: "TBD",
    time: "TBD",
  },
  {
    title: "Info Session #2",
    date: "TBD",
    location: "TBD",
    time: "TBD",
  },
  {
    title: "Hot Chocolate Stand",
    date: "TBD",
    location: "TBD",
    time: "TBD",
  },
  {
    title: "DEI Panel",
    date: "TBD",
    location: "TBD",
    time: "TBD",
  },
  { title: "Applications Due", date: "TBD", time: "11:59 PM" },
];

const RushTimeline: React.FC = () => {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      <h2 className={styles.heading}>Winter 2026 Rush Timeline</h2>
      <div className={styles.timeline}>
        {events.map((event, idx) => (
          <div
            key={`${event.title}-${idx}`}
            ref={(el: HTMLDivElement | null) => {
              itemsRef.current[idx] = el; // ✅ Type-safe, returns void
            }}
            className={`${styles.timelineItem} ${
              idx % 2 === 0 ? styles.left : styles.right
            }`}
          >
            <div className={styles.content}>
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
                  <span className={styles.dateText}>{event.date}</span>
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
