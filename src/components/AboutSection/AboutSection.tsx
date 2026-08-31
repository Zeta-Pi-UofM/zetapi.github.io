import styles from "./AboutSection.module.css";
import HomeInfo from "../HomeInfo/HomeInfo";
import OurCommunity from "../OurCommunity/OurCommunity";

export default function AboutSection() {
  return (
    <>
      <div className={styles.wrapper}>
        {/* Blob Background */}
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>
        <div className={styles.blob4}></div>

        {/* Main Text */}
        <div className={styles.content}>
          <h1 className={styles.title}>Zeta Pi</h1>
          <p className={styles.subtitle}>
            A Co-Ed Professional Technology Fraternity founded in 2023 at the
            University of Michigan.
          </p>
          <a href="/#/rush" className={styles.heroBtn}>
            Fall 2026 Rush
          </a>
        </div>
      </div>

      <HomeInfo />
      <OurCommunity />
    </>
  );
}
