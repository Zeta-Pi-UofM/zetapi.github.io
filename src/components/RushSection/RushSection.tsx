import React, { useState } from "react";
import styles from "./RushSection.module.css";
import RushTimeline from "./RushTimeline.tsx";

const RUSH_VIDEO_ID = "4SzZx5DZTEc";

const RushSection: React.FC = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className={styles.container} style={{ fontFamily: "inherit" }}>
      <h1 className={styles.title}>RUSH</h1>
      <p className={styles.subtitle}>Join Zeta Pi this upcoming semester!</p>
      <p className={styles.deadline}>Applications for Fall 2026 open soon!</p>

      <div className={styles.buttonContainer}>
        <a
          href="https://forms.gle/pHdKsWdiuyAt6JfeA"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.interestButton}
        >
          Interest Form
        </a>
        <a
          href="https://forms.gle/LTB98ndcCRweUSAT8"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.applicationButton}
        >
          Apply Here!
        </a>
      </div>

      <div className={styles.introSection}>
        <div className={styles.whatIsRush}>
          <h2 className={styles.title2}>What is Rush?</h2>
          <p>
            Rush is the recruitment period during which prospective members
            explore what the fraternity is about, attend events, meet current
            brothers and sisters, and learn about the organization's values,
            goals, and professional opportunities. Rush is non-binding —
            attending events doesn't commit you to join — it's simply a chance
            for both you and the organization to get to know each other better.
          </p>
        </div>
        <div className={styles.video}>
          <div className={styles.videoFrame}>
            {videoPlaying ? (
              <iframe
                className={styles.videoEmbed}
                src={`https://www.youtube-nocookie.com/embed/${RUSH_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&color=white`}
                title="Zeta Pi Rush Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className={styles.videoPoster}
                onClick={() => setVideoPlaying(true)}
                aria-label="Play Zeta Pi Rush video"
                style={{
                  backgroundImage: `url(https://i.ytimg.com/vi_webp/${RUSH_VIDEO_ID}/maxresdefault.webp), url(https://i.ytimg.com/vi/${RUSH_VIDEO_ID}/hqdefault.jpg)`,
                }}
              >
                <span className={styles.playButton} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="34" height="34">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </span>
              </button>
            )}
          </div>
          <div className={styles.videoCredit}>
            Video by{" "}
            <a
              href="https://anshc.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              Ansh Chauhan
            </a>
          </div>
        </div>
      </div>

      <div>
        <RushTimeline />
      </div>
    </div>
  );
};

export default RushSection;
