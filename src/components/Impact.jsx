import { motion } from 'motion/react';
import { ArrowUpRight, Quote, Star } from 'lucide-react';
import { milestones, socials, stats, testimonials } from '../data/content';
import Counter from './Counter';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

function Sparkline() {
  return (
    <svg className="stat-sparkline" viewBox="0 0 260 96" fill="none" aria-hidden="true">
      <path className="spark-grid" d="M0 24H260M0 48H260M0 72H260" />
      <motion.path
        className="spark-line"
        d="M4 78 C28 76 36 54 58 58 C82 63 92 84 114 70 C138 55 148 26 172 34 C196 42 204 60 224 38 C240 21 248 18 256 12"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <circle className="spark-dot" cx="256" cy="12" r="4" />
    </svg>
  );
}

export default function Impact() {
  return (
    <section id="impact" className="section impact-section" aria-labelledby="impact-title">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Impact"
          id="impact-title"
          title={
            <>
              Momentum, in <em>numbers.</em>
            </>
          }
          description="Receipts from building in public — content that travelled, credentials earned, and rooms I helped move."
        />

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              className={`stat-card accent-${stat.accent} ${stat.featured ? 'is-featured' : ''}`.trim()}
              delay={index * 0.05}
              as="article"
            >
              <div className="stat-card-top">
                <span className="stat-note">{stat.note}</span>
                <span className="stat-index" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <div className="stat-value">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="stat-label">{stat.label}</p>
              {stat.featured ? <Sparkline /> : <span className="stat-mark" aria-hidden="true">✳</span>}
            </Reveal>
          ))}

          <Reveal className="stat-card stat-card--github" delay={0.3}>
            <a
              className="stat-github-link"
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="stat-github-icon">
                <ArrowUpRight size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span>
                <strong>The build log continues.</strong>
                <span>More experiments on GitHub</span>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="milestone-block">
          <Reveal className="milestone-heading">
            <span className="milestone-kicker">Milestone receipts</span>
            <h3>Small moments. Long-term momentum.</h3>
          </Reveal>
          <div className="milestone-grid">
            {milestones.map((milestone, index) => (
              <Reveal
                as="article"
                className={`milestone-card accent-line--${milestone.accent}`}
                key={milestone.title}
                delay={index * 0.05}
              >
                <span className="milestone-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h4>{milestone.title}</h4>
                <p>{milestone.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="testimonials-block">
          <Reveal className="testimonials-heading">
            <Quote size={30} strokeWidth={1.5} aria-hidden="true" />
            <h3>In their words.</h3>
          </Reveal>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <Reveal
                as="figure"
                className="testimonial-card"
                key={testimonial.name}
                delay={index * 0.07}
              >
                <div className="testimonial-stars" role="img" aria-label="Rated 5 out of 5">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      strokeWidth={1.8}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote>“{testimonial.quote}”</blockquote>
                <figcaption>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
