import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { navLinks, socials } from '../data/content';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="footer-logo" href="#home" aria-label="Back to home">
              <span className="footer-mark" aria-hidden="true">
                HR
                <span>✦</span>
              </span>
              <span className="footer-brand-copy">
                <strong>Himanshu Rathi</strong>
                <small>Developer × Creator × Leader</small>
              </span>
            </a>
            <p>
              Building technology, creating digital experiences, and growing communities from Pune,
              India.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-contact">
            <a href={socials.emailCompose} target="_blank" rel="noopener noreferrer">
              {socials.email}
            </a>
            <a href={socials.resume} target="_blank" rel="noopener noreferrer">
              View resume <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <SocialLinks />
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} Himanshu Rathi. Designed &amp; built from scratch.
          </p>
          <p className="footer-location">Pune, Maharashtra · India</p>
          <a className="footer-top-link" href="#home">
            Back to top
            <ArrowUp size={14} strokeWidth={2.1} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
