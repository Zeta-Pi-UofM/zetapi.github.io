import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"; // ⬅️ for current path
import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // current URL path

  // lock body scroll while the drawer is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = open ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // close the drawer on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/rush", label: "Rush" },
    { href: "/members", label: "Members" },
    // { href: "/gallery", label: "Gallery" }, // Gallery is built but not yet live
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.menuRight}>
          {/* Logo uses background-image in CSS */}
          <Link to="/" className={styles.keycapLogo} aria-label="Home"></Link>

          {/* Desktop links */}
          <div className={styles.navLinks} aria-label="Primary">
            <ul className={styles.centerAlignC}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={
                      location.pathname === link.href ? styles.activeLink : ""
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Application button */}
          <a
            href="https://forms.gle/LTB98ndcCRweUSAT8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.applyButton}
          >
            Apply Here!
          </a>
        </div>
      </nav>

      {/*
        The mobile menu layers live OUTSIDE <nav> on purpose: .navBar has
        backdrop-filter, which makes it the containing block for any
        position:fixed descendant. Nested here they'd be pinned to the ~76px
        sticky bar instead of the viewport, so the drawer/backdrop broke once
        the page was scrolled. As siblings under #root they stay viewport-fixed.
      */}
      <button
        type="button"
        className={`${styles.menuToggle} ${open ? styles.menuToggleOpen : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-controls="mobileMenu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Off-canvas layer — a viewport-sized clip box so the parked drawer
          can't widen the page */}
      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}>
        {/* Dim + blur the page behind the drawer; tap to close */}
        <div className={styles.backdrop} onClick={closeMenu} aria-hidden="true" />

        {/* Slide-out mobile drawer */}
        <ul id="mobileMenu" className={styles.menuItem} role="menu" aria-hidden={!open}>
          {links.map((link) => (
            <li key={link.href} role="none">
              <Link
                role="menuitem"
                tabIndex={open ? 0 : -1}
                to={link.href}
                onClick={closeMenu}
                className={
                  location.pathname === link.href ? styles.activeLink : ""
                }
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Application button pinned to the bottom of the drawer */}
          <li role="none" className={styles.applyRow}>
            <a
              href="https://forms.gle/LTB98ndcCRweUSAT8"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
              className={styles.mobileApplyButton}
            >
              Apply Here!
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
