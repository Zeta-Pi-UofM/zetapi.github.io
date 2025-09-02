import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';   // ⬅️ for current path
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // current URL path

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = open ? 'hidden' : '';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const closeMenu = () => setOpen(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/rush', label: 'Rush' },
    { href: '/members', label: 'Members' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
      <nav className={styles.navBar}>
        <div className={styles.menuRight}>
          {/* Logo uses background-image in CSS */}
          <Link to="/" className={styles.keycapLogo} aria-label="Home"></Link>

          {/* Desktop links */}
          <div className={styles.navLinks} aria-label="Primary">
            <ul className={styles.centerAlignC}>
              {links.map(link => (
                  <li key={link.href}>
                    <Link
                        to={link.href}
                        className={location.pathname === link.href ? styles.activeLink : ''}
                    >
                      {link.label}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Application button */}
          <a
            href="https://docs.google.com/forms/d/1uYr-rkDrCJeD4mk6-rno6c94dywLZoTDUvoHyymbgfk/edit"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.applyButton}
          >
            Apply Here!
          </a>

          {/* Mobile hamburger — hidden while menu is open */}
          {!open && (
              <button
                  type="button"
                  className={styles.menuToggle}
                  aria-label="Open menu"
                  aria-controls="mobileMenu"
                  aria-expanded={false}
                  onClick={() => setOpen(true)}
              >
                <span /><span /><span />
              </button>
          )}
        </div>

        {/* Slide-out mobile menu */}
        <ul
            id="mobileMenu"
            className={`${styles.menuItem} ${open ? styles.menuItemOpen : ''}`}
            role="menu"
            aria-hidden={!open}
        >
          {/* Close button */}
          <button
              type="button"
              className={styles.menuClose}
              aria-label="Close menu"
              onClick={closeMenu}
          >
            ×
          </button>

          {links.map(link => (
              <li key={link.href} role="none">
                <Link
                    role="menuitem"
                    to={link.href}
                    onClick={closeMenu}
                    className={location.pathname === link.href ? 'activeLink' : ''}
                >
                  {link.label}
                </Link>
              </li>
          ))}
          
          {/* Application button for mobile */}
          <li role="none">
            <a
              href="https://docs.google.com/forms/d/1uYr-rkDrCJeD4mk6-rno6c94dywLZoTDUvoHyymbgfk/edit"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={closeMenu}
              className={styles.mobileApplyButton}
            >
              Apply
            </a>
          </li>
        </ul>
      </nav>
  );
};

export default NavBar;