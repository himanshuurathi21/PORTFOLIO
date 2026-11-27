import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Crown,
  GraduationCap,
  Heart,
  Laptop,
  MessageCircle,
  Mic,
  Music,
  Palette,
  Sparkles,
  Users,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { socials } from '../data/content';

const interests = [
  { label: 'Technology', icon: Laptop },
  { label: 'Creativity', icon: Palette },
  { label: 'Dance', icon: Music },
  { label: 'Public speaking', icon: Mic },
  { label: 'Storytelling', icon: MessageCircle },
  { label: 'Community', icon: Users },
];

export default function About() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="About"
          id="about-title"
          title={
            <>
              More than a <em>resume.</em>
            </>
          }
          description="Developer by craft, creator by instinct, leader by choice. Here’s the context behind the code."
        />

        <div className="bento-grid">
          <Reveal as="article" className="bento-card bento-edu" delay={0.03}>
            <div className="bento-card-top">
              <span className="bento-label">Education</span>
              <span className="bento-icon">
                <GraduationCap size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
            <h3>MIT Academy of Engineering</h3>
            <p className="bento-sub">B.Tech - Information Technology</p>
            <div className="edu-numbers">
              <div>
                <strong>8.10</strong>
                <span>CGPA</span>
              </div>
              <div>
                <strong>2029</strong>
                <span>Batch</span>
              </div>
              <span className="bento-badge">Current</span>
            </div>
            <div className="bento-tags">
              <span>Pune, Maharashtra</span>
              <span>2025 - 2029</span>
            </div>
            <span className="bento-watermark" aria-hidden="true">
              MIT
            </span>
          </Reveal>

          <Reveal as="article" className="bento-card bento-dev" delay={0.08}>
            <div className="bento-card-top">
              <span className="bento-label">Developer</span>
              <span className="bento-icon">
                <Code2 size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
            <h3>I learn by building things that ship.</h3>
            <p>
              Alongside college, I build tech projects - from loyalty systems and skill-bartering
              platforms to AI business dashboards. I&apos;ve participated in{' '}
              <strong>4 hackathons</strong> and earned <strong>15 certifications</strong> from
              IBM, Cisco, Anthropic and Reliance Foundation.
            </p>
            <div className="dev-stats">
              <div>
                <strong>07</strong>
                <span>projects built</span>
              </div>
              <div>
                <strong>04</strong>
                <span>hackathons</span>
              </div>
              <div>
                <strong>15</strong>
                <span>certifications</span>
              </div>
            </div>
            <div className="building-strip">
              <span className="status-dot status-dot--small" aria-hidden="true" />
              <span>
                <strong>Currently building</strong> with LangChain, RAG pipelines &amp; FastAPI.
              </span>
            </div>
            <a className="text-link" href="#projects">
              See what I&apos;ve shipped
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal as="article" className="bento-card bento-creator" delay={0.04}>
            <div className="bento-card-top">
              <span className="bento-label">Content Creator</span>
              <span className="bento-icon">
                <Sparkles size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
            <div className="bento-big-stat">
              400K<span>+</span>
            </div>
            <p className="bento-stat-label">content dashboard impressions</p>
            <div className="creator-bars" aria-hidden="true">
              <span style={{ '--bar': '42%' }} />
              <span style={{ '--bar': '66%' }} />
              <span style={{ '--bar': '54%' }} />
              <span style={{ '--bar': '88%' }} />
              <span style={{ '--bar': '72%' }} />
              <span style={{ '--bar': '100%' }} />
            </div>
            <p>
              A trending reel at <strong>275K views</strong> and a few personal reels past{' '}
              <strong>200K+ views</strong>. I create content that connects.
            </p>
          </Reveal>

          <Reveal as="article" className="bento-card bento-lead" delay={0.1}>
            <div className="bento-card-top">
              <span className="bento-label">Leadership</span>
              <span className="bento-icon">
                <Crown size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
            <div className="lead-role">
              <span className="lead-monogram">VP</span>
              <div>
                <h3>CIPHER Association</h3>
                <p>Vice President · MIT AOE</p>
              </div>
            </div>
            <p>
              Leading the Executive Council of MIT&apos;s IT Department - branding, digital
              outreach, events, and a 24-hour hackathon with a 32-member team.
            </p>
            <div className="bento-tags">
              <span>Branding</span>
              <span>Events</span>
              <span>Community</span>
            </div>
          </Reveal>

          <Reveal as="article" className="bento-card bento-experience" delay={0.16}>
            <div className="bento-card-top">
              <span className="bento-label">Experience</span>
              <span className="bento-icon">
                <Briefcase size={20} strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
            <h3>Fanfeed Digital</h3>
            <p className="bento-sub">Social Media Manager · Apr 2026 - Present</p>
            <p>
              Building content strategy and campaigns for a sports engagement platform. A collab
              reel with IPL founder <strong>Lalit Modi</strong> crossed{' '}
              <strong>115K+ views</strong>.
            </p>
            <a className="text-link text-link--dark" href="#experience">
              Walk the timeline
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal as="article" className="bento-card bento-human" delay={0.12}>
            <div className="bento-human-copy">
              <div className="bento-card-top">
                <span className="bento-label">Off the clock</span>
                <span className="bento-icon">
                  <Heart size={20} strokeWidth={1.7} aria-hidden="true" />
                </span>
              </div>
              <h3>
                Tech is the job. <em>Curiosity</em> is the personality.
              </h3>
              <p>
                Outside work, I&apos;m into dance, public speaking, storytelling, and shayri. I
                believe great content is not just about creativity - it&apos;s about solving
                problems, creating value, and building genuine connections.
              </p>
              <div className="interest-chips" role="list" aria-label="Personal interests">
                {interests.map(({ label, icon: Icon }) => (
                  <span className="interest-chip" key={label} role="listitem">
                    <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <aside className="human-aside">
              <span className="human-aside-kicker">The through-line</span>
              <blockquote>
                “Build, create, and make an impact.”
              </blockquote>
              <span className="human-aside-meta">Pune, Maharashtra · Batch of 2029</span>
              <a
                className="human-mail"
                href={socials.emailCompose}
                target="_blank"
                rel="noopener noreferrer"
              >
                Let&apos;s talk
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
