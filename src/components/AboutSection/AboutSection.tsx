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
            Winter 2026 Rush
          </a>
        </div>
      </div>

      <HomeInfo />
      <OurCommunity />
    </>
  );
}

/* Original Homepage
const AboutSection: React.FC = () => {
  return (
    <>
      <div className={styles.heroSection}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            <span>Z</span>
            <span>e</span>
            <span>t</span>
            <span>a</span>
            <span>&nbsp;</span>
            <span>P</span>
            <span>i</span>
          </h1>

          <p className={styles.subtitle}>
            A Co-Ed Professional Technology Fraternity founded in 2023 at the
            University of Michigan.
          </p>

          <a href="/rush" className={styles.heroBtn}>
            Fall 2025 Rush
          </a>
        </div>

        <div className={styles.imageContainer}>
          <img
            src="/images/computer.png"
            alt="Computer"
            className={styles.heroImage}
            loading="lazy"
          />
        </div>
      </div>

    
    </>
  );
};
*/
