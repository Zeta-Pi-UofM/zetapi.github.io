import styles from "./ContactForm.module.css";

export default function ContactForm() {
  return (
    <div id={styles.contactInfo}>
      <div className={styles.emailSection}>
        <h3 className={styles.sectionTitle}>Email Us</h3>
        <div className={styles.emailGrid}>
          <div className={`${styles.emailItem} ${styles.fullWidth}`}>
            <p className={styles.emailLabel}>Club Email:</p>
            <a href="mailto:zetapi-info@umich.edu" className={styles.emailLink}>
              zetapi-info@umich.edu
            </a>
          </div>
          <div className={styles.emailItem}>
            <p className={styles.emailLabel}>President:</p>
            <a href="mailto:amoomaw@umich.edu" className={styles.emailLink}>
              amoomaw@umich.edu
            </a>
          </div>
          <div className={styles.emailItem}>
            <p className={styles.emailLabel}>Vice President:</p>
            <a href="mailto:cathyfan@umich.edu" className={styles.emailLink}>
              cathyfan@umich.edu
            </a>
          </div>
          <div className={styles.emailItem}>
            <p className={styles.emailLabel}>Co-Head of RAM:</p>
            <a href="mailto:nairanan@umich.edu" className={styles.emailLink}>
              nairanan@umich.edu
            </a>
          </div>
          <div className={styles.emailItem}>
            <p className={styles.emailLabel}>Co-Head of RAM:</p>
            <a href="mailto:zgammo@umich.edu" className={styles.emailLink}>
              zgammo@umich.edu
            </a>
          </div>
        </div>
      </div>

      <div className={styles.socialSection}>
        <h3 className={styles.sectionTitle}>Our Socials</h3>
        <div className={styles.socialIcons}>
          <a
            href="https://www.linkedin.com/company/91309323/admin/feed/posts/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="Li fab fa-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/zetapi.umich/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="Li fab fa-instagram"></i>
          </a>
          <a
            href="https://www.tiktok.com/@zetapiumich"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="Li fab fa-tiktok"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
