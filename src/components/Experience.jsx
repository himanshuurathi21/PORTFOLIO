import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, Check, Download, Sparkles, Star } from 'lucide-react';
import { experiences, socials } from '../data/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const currentRoles = experiences.filter((experience) => experience.current);

export default function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.78', 'end 0.62'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section
      id="experience"
      className="section experience-section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          id="experience-title"
          title={
            <>
              A timeline of <em>showing up.</em>
            </>
          }
          description="Four current roles, two foundation chapters. Different titles, same instinct: make the work travel."
        />

        <div className="experience-layout">
          <aside className="experience-aside">
            <div className="currently-card">
              <span className="currently-kicker">
                <span className="status-dot status-dot--small" aria-hidden="true" />
                Currently wearing four hats
              </span>
              <ul className="current-role-list">
                {currentRoles.map((role) => (
                  <li key={role.org} className={`current-role current-role--${role.accent}`}>
                    <span className="current-role-dot" aria-hidden="true" />
                    <span>
                      <strong>{role.role}</strong>
                      <small>{role.org}</small>
                    </span>
                  </li>
                ))}
              </ul>
              <p>
                Leading communities, shipping content, and staying close to the code — all at
                once.
              </p>
              <a
                className="text-link"
                href={socials.resumePdf}
                download="Himanshu-Rathi-Resume.pdf"
              >
                Download full resume
                <Download size={15} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>

            <div className="experience-aside-note">
              <Star size={16} strokeWidth={1.8} aria-hidden="true" />
              <p>
                &ldquo;Still figuring out my exact path — startup, freelance, or something else —
                but I know I want to build, create, and make an impact.&rdquo;
              </p>
            </div>
          </aside>

          <div className="timeline" ref={timelineRef}>
            <div className="timeline-track" aria-hidden="true">
              <motion.span className="timeline-progress" style={{ scaleY: lineScale }} />
            </div>

            {experiences.map((experience, index) => (
              <Reveal
                as="article"
                className={`timeline-item accent-${experience.accent}`}
                key={`${experience.org}-${experience.role}`}
                delay={index * 0.04}
              >
                <span className="timeline-node" aria-hidden="true">
                  <span />
                </span>
                <div className="timeline-card">
                  <span className="timeline-watermark" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="timeline-card-top">
                    <span className="timeline-index">Chapter {String(index + 1).padStart(2, '0')}</span>
                    {experience.current ? (
                      <span className="current-badge">
                        <span className="status-dot status-dot--small" aria-hidden="true" />
                        Current
                      </span>
                    ) : (
                      <span className="past-badge">Past</span>
                    )}
                  </div>

                  <h3>{experience.role}</h3>
                  <div className="timeline-org-row">
                    <span className="timeline-org">{experience.org}</span>
                    <span className="timeline-date">{experience.date}</span>
                  </div>

                  <p className="timeline-description">{experience.description}</p>

                  <div className="timeline-details">
                    <div>
                      <h4>Responsibilities</h4>
                      <ul>
                        {experience.responsibilities.map((item) => (
                          <li key={item}>
                            <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {experience.achievements.length ? (
                      <div>
                        <h4>Achievements</h4>
                        <ul>
                          {experience.achievements.map((item) => (
                            <li key={item}>
                              <Sparkles size={13} strokeWidth={2} aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <div className="timeline-footer">
                    <ul className="timeline-tags" aria-label="Skills used">
                      {experience.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    {experience.link ? (
                      <a
                        className="timeline-link"
                        href={experience.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {experience.link.label}
                        <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
