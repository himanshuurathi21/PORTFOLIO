import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Mail, Sparkles } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { filters, projects, socials } from '../data/content';
import SectionHeading from './SectionHeading';
import ProjectVisual from './ProjectVisual';
import TiltCard from './TiltCard';
import ProjectModal from './ProjectModal';

const ease = [0.22, 1, 0.36, 1];

function ProjectCard({ project, onOpen }) {
  const primaryLink = project.links.live || project.links.demo;
  const primaryLabel = project.links.live ? 'Live build' : 'Request demo';

  return (
    <motion.article
      layout
      className={`project-card ${project.cover ? 'project-card--cover' : ''}`.trim()}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease }}
    >
      <TiltCard className={`project-card-tilt accent-${project.accent}`} maxTilt={3.2}>
        <div className="project-media-wrap">
          <ProjectVisual project={project} />
          <button
            type="button"
            className="project-media-hit"
            onClick={() => onOpen(project)}
            aria-label={`Open ${project.title} case study`}
            aria-haspopup="dialog"
          >
            <span className="project-open-hint" aria-hidden="true">
              Open case
              <ArrowUpRight size={15} strokeWidth={2} />
            </span>
          </button>
          <span className="project-number" aria-hidden="true">
            {project.number}
          </span>
          <span className="project-status">{project.status}</span>
        </div>

        <div className="project-content">
          <div className="project-kicker">
            <span className="project-kicker-line" aria-hidden="true" />
            {project.categoryLabel}
          </div>
          <h3>
            <button type="button" onClick={() => onOpen(project)} aria-haspopup="dialog">
              {project.title}
            </button>
          </h3>
          <span className="sr-only">Status: {project.status}</span>
          <p className="project-tagline">{project.tagline}</p>
          <p className="project-description">{project.description}</p>

          <ul className="project-tech" aria-label={`${project.title} technology stack`}>
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className="project-actions">
            {primaryLink ? (
              <a
                className="project-action project-action--primary"
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${primaryLabel} — ${project.title}`}
              >
                {project.links.live ? (
                  <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
                ) : (
                  <Mail size={15} strokeWidth={2} aria-hidden="true" />
                )}
                {primaryLabel}
              </a>
            ) : null}
            {project.links.github ? (
              <a
                className="project-action"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub`}
              >
                <GithubIcon size={15} strokeWidth={2} aria-hidden="true" />
                Code
              </a>
            ) : null}
            <button
              type="button"
              className="project-action project-action--details"
              onClick={() => onOpen(project)}
              aria-haspopup="dialog"
            >
              Case study
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const closeModal = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Selected Work"
          id="projects-title"
          title={
            <>
              Proof, not <em>promises.</em>
            </>
          }
          description="Eight builds across full-stack products, AI prototypes, desktop software and event web apps. Real screens, working links, honest scope."
        />

        <div className="projects-toolbar">
          <div className="filter-bar" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => {
              const count =
                filter.id === 'all'
                  ? projects.length
                  : projects.filter((project) => project.category === filter.id).length;
              return (
                <button
                  key={filter.id}
                  type="button"
                  className={`filter-btn ${activeFilter === filter.id ? 'is-active' : ''}`.trim()}
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                >
                  {filter.label}
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          <a
            className="projects-github-link"
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon size={16} strokeWidth={1.9} aria-hidden="true" />
            More on GitHub
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {filteredProjects.length} projects.
        </p>

        <motion.div layout className="project-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="github-cta">
          <div className="github-cta-copy">
            <span className="github-cta-icon">
              <Sparkles size={20} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <h3>There&apos;s more where that came from.</h3>
              <p>Experiments, smaller builds, and works in progress live on GitHub.</p>
            </div>
          </div>
          <a
            className="btn btn-secondary"
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit GitHub profile
            <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
