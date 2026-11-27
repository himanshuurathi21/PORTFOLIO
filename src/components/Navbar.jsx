import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks, socials } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { trapFocus } from '../utils/focus';
import ThemeToggle from './ThemeToggle';
import SocialLinks from './SocialLinks';

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.25 });

  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const background = [
      document.getElementById('main-content'),
      document.querySelector('.site-footer'),
      document.querySelector('.back-to-top'),
      document.querySelector('.skip-link'),
    ].filter(Boolean);

    document.body.style.overflow = 'hidden';
    background.forEach((element) => element.setAttribute('inert', ''));

    const focusTimer = window.setTimeout(() => {
      menuRef.current?.querySelector('.mobile-nav-link')?.focus();
    }, 80);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      trapFocus(event, [document.querySelector('.site-header'), menuRef.current]);
    };
    const onResize = () => {
      if (window.innerWidth > 1240) setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => element.removeAttribute('inert'));
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);

      const toggle = toggleRef.current;
      if (toggle && toggle.getClientRects().length) {
        toggle.focus();
      } else {
        document.querySelector('.brand')?.focus();
      }
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`.trim()}>
        <motion.div className="scroll-progress" style={{ scaleX: progressX }} aria-hidden="true" />
        <div className="container nav-shell">
          <a className="brand" href="#home" aria-label="Himanshu Rathi - home" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">
              HR
              <span className="brand-star">✦</span>
            </span>
            <span className="brand-copy">
              <strong>Himanshu Rathi</strong>
              <small>Developer × Creator × Leader</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'is-active' : ''}`.trim()}
                aria-current={activeSection === link.id ? 'location' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a
              className="nav-resume"
              href={socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Himanshu Rathi's resume in a new tab"
            >
              <span>Resume</span>
              <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`.trim()}
              ref={toggleRef}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? 'mobile-menu' : undefined}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={22} strokeWidth={1.9} aria-hidden="true" />
              ) : (
                <Menu size={22} strokeWidth={1.9} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-menu-inner container">
              <span className="mobile-menu-label">Navigate</span>
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`mobile-nav-link ${activeSection === link.id ? 'is-active' : ''}`.trim()}
                    onClick={closeMenu}
                    aria-current={activeSection === link.id ? 'location' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.045, duration: 0.35 }}
                  >
                    <span className="mobile-nav-index">0{index + 1}</span>
                    <span>{link.label}</span>
                    <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" />
                  </motion.a>
                ))}
              </nav>

              <div className="mobile-menu-footer">
                <a
                  className="btn btn-primary mobile-resume"
                  href={socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  View resume
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <div className="mobile-menu-contact">
                  <a href={socials.emailCompose} target="_blank" rel="noopener noreferrer">
                    {socials.email}
                  </a>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
