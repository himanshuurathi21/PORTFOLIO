import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { heroBadges, roles, socials } from '../data/content';
import Magnetic from './Magnetic';
import Marquee from './Marquee';
import SocialLinks from './SocialLinks';

const toolbelt = [
  'Python',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'Prisma',
  'PostgreSQL',
  'Tailwind',
  'Streamlit',
  'LangChain',
  'Git & GitHub',
];

const ease = [0.22, 1, 0.36, 1];

function RoleRotator() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <span className="role-rotator" aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          className="role-rotator-word"
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.32, ease }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function HeroLine({ children, delay, className = '' }) {
  return (
    <span className={`hero-line-mask ${className}`.trim()}>
      <motion.span
        className="hero-line-inner"
        initial={{ y: '115%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.95, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-grid" />
        <span className="hero-glow hero-glow--purple" />
        <span className="hero-glow hero-glow--cyan" />
        <span className="hero-glow hero-glow--coral" />
        <span className="hero-asterisk hero-asterisk--one">✳</span>
        <span className="hero-asterisk hero-asterisk--two">✳</span>
      </div>

      <div className="container hero-layout">
        <div className="hero-copy">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              Open for internships &amp; collaborations
            </span>
            <span className="hero-location">
              <MapPin size={13} strokeWidth={1.9} aria-hidden="true" />
              Pune, India
            </span>
          </motion.div>

          <h1 className="hero-title" id="hero-title">
            <span className="sr-only">I build. I create. I make things happen.</span>
            <span aria-hidden="true">
              <HeroLine delay={0.15}>I BUILD.</HeroLine>
              <HeroLine delay={0.25} className="hero-line--outline">
                I CREATE.
              </HeroLine>
              <HeroLine delay={0.35}>I MAKE THINGS</HeroLine>
              <HeroLine delay={0.45} className="hero-line--accent">
                HAPPEN.
              </HeroLine>
            </span>
          </h1>

          <motion.p
            className="hero-subheading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
          >
            <span className="role-purple">Developer</span>
            <span className="role-separator">×</span>
            <span className="role-coral">Creator</span>
            <span className="role-separator">×</span>
            <span className="role-cyan">Leader</span>
          </motion.p>

          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.63 }}
          >
            I&apos;m <strong>Himanshu Rathi</strong>, an IT student passionate about building
            technology, exploring AI, creating digital experiences, and building communities.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
          >
            <Magnetic>
              <a className="btn btn-primary" href="#projects">
                Explore my work
                <span className="btn-icon" aria-hidden="true">
                  <ArrowDown size={16} strokeWidth={2.2} />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                className="btn btn-secondary"
                href={socials.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                View resume
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <SocialLinks />
            <span className="hero-meta-rule" aria-hidden="true" />
            <div className="hero-metrics" role="group" aria-label="Quick facts">
              <span>
                <strong>7</strong> projects
              </span>
              <span>
                <strong>15</strong> certifications
              </span>
              <span>
                <strong>4</strong> hackathons
              </span>
            </div>
          </motion.div>

          <motion.a
            className="hero-scroll"
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <span className="hero-scroll-track" aria-hidden="true">
              <span />
            </span>
            Scroll to explore
          </motion.a>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
        >
          <div className="portrait-stage">
            <div className="portrait-orbit" aria-hidden="true">
              <svg viewBox="0 0 160 160" focusable="false">
                <defs>
                  <path
                    id="orbit-path"
                    d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                  />
                </defs>
                <text>
                  <textPath href="#orbit-path" startOffset="0%">
                    DEVELOPER × CREATOR × LEADER × BUILDER ×
                  </textPath>
                </text>
              </svg>
              <span className="orbit-core">✳</span>
            </div>

            <span className="portrait-coordinates" aria-hidden="true">
              18.52° N / 73.86° E
            </span>
            <span className="portrait-tape portrait-tape--left" aria-hidden="true" />
            <span className="portrait-tape portrait-tape--right" aria-hidden="true" />
            <span className="portrait-backdrop" aria-hidden="true" />

            <div className="portrait-frame">
              <img
                src="/assets/images/profile.jpg"
                alt="Portrait of Himanshu Rathi"
                width="1000"
                height="1165"
                fetchPriority="high"
                decoding="async"
              />
              <div className="portrait-footer">
                <span className="portrait-footer-name">Himanshu Rathi</span>
                <span className="portrait-footer-role">IT &apos;29 · MIT AOE</span>
              </div>
            </div>

            <div className="role-card">
              <span className="role-card-kicker">
                <span className="status-dot status-dot--small" aria-hidden="true" />
                In the wild
              </span>
              <RoleRotator />
              <span className="sr-only">Roles: {roles.join(', ')}</span>
            </div>

            {heroBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                className={`hero-badge hero-badge--${badge.accent} hero-badge--${badge.position}`}
                initial={{ opacity: 0, scale: 0.82, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.8 + index * 0.1, ease }}
              >
                <strong>{badge.label}</strong>
                <span>{badge.meta}</span>
              </motion.div>
            ))}

            <span className="portrait-sticker" aria-hidden="true">
              open to build
            </span>
          </div>

          <div className="hero-visual-caption">
            <span>Available for the next big thing</span>
            <a href={socials.emailCompose} target="_blank" rel="noopener noreferrer">
              Say hello <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="hero-ticker">
        <div className="hero-ticker-label">
          <span className="status-dot status-dot--small" aria-hidden="true" />
          Toolbox in motion
        </div>
        <Marquee items={toolbelt} duration={44} className="hero-marquee" />
      </div>
    </section>
  );
}
