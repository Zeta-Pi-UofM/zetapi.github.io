import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    const location = useLocation();

    return (
        <>
            <div className={styles.topLine} />
            <footer className={styles.footer}>
                <div className={styles.content}>
                    {/* Left side - general info */}
                    <div className={styles.left}>
                        <h2 className={styles.title}>Zeta Pi</h2>
                        <p className={styles.email}>zetapi-info@umich.edu</p>

                        <div className={styles.socialIcons}>
                            <a href="https://www.linkedin.com/company/91309323/admin/feed/posts/" target="_blank" rel="noopener noreferrer">
                                <i className="Li fab fa-linkedin"></i>
                            </a>
                            <a href="https://www.instagram.com/zetapi.umich/" target="_blank" rel="noopener noreferrer">
                                <i className="Li fab fa-instagram"></i>
                            </a>
                            <a href="https://www.tiktok.com/@zetapiumich" target="_blank" rel="noopener noreferrer">
                                <i className="Li fab fa-tiktok"></i>
                            </a>
                        </div>
                    </div>

                    {/* Right side - menu links */}
                    <div className={styles.right}>
                        <h3 className={styles.menuTitle}>Menu</h3>
                        <ul className={styles.menuList}>
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => window.scrollTo(0,0)}
                                    className={location.pathname === "/" ? styles.activeLink : ''}>Home</Link>
                            </li>
                            <li>
                                <Link
                                    to="/members"
                                    onClick={() => window.scrollTo(0,0)}
                                    className={location.pathname === "/members" ? styles.activeLink : ''}>Members</Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    onClick={() => window.scrollTo(0,0)}
                                    className={location.pathname === "/contact" ? styles.activeLink : ''}>Contact</Link>
                            </li>
                            <li>
                                <Link
                                    to="/rush"
                                    onClick={() => window.scrollTo(0,0)}
                                    className={location.pathname === "/rush" ? styles.activeLink : ''}>Rush</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* All rights reserved statement */}
                <div className={styles.bottomText}>
                    2025 Zeta Pi | All Rights Reserved
                </div>
            </footer>
        </>
    );
};

export { Footer };