import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Mail, X } from 'lucide-react';
import { trapFocus } from '../utils/focus';
import { GithubIcon } from './BrandIcons';
import ProjectVisual from './ProjectVisual';

const ease = [0.22, 1, 0.36, 1];

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchStartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const gallery = project.gallery ?? [];
  const activeShot = gallery[activeIndex];
  const previewHost = project.previewHost || 'project preview';
  const hasGallery = gallery.length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [project.id]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const root = document.getElementById('root');
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    if (root) {
      root.setAttribute('inert', '');
      root.setAttribute('aria-hidden', 'true');
    }

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      trapFocus(event, dialogRef.current);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (root) {
        root.removeAttribute('inert');
        root.removeAttribute('aria-hidden');
      }
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [onClose]);

  const stepGallery = (direction) => {
    if (gallery.length < 2) return;
    setActiveIndex((current) => (current + direction + gallery.length) % gallery.length);
  };

  const handleGalleryKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepGallery(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepGallery(1);
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      stepGallery(deltaX < 0 ? 1 : -1);
    }
  };

  const primaryLink = project.links.live || project.links.demo;
  const primaryLabel = project.links.live ? 'View live build' : 'Request demo';

  return createPortal(
    <motion.div
      className="modal-backdrop"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-tagline"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className={`project-modal accent-${project.accent}`}
        initial={{ opacity: 0, y: 42, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.98 }}
        transition={{ duration: 0.4, ease }}
      >
        <div className="modal-gallery">
          {hasGallery ? (
            <>
              <div className="modal-gallery-frame">
                <div className="browser-bar" aria-hidden="true">
                  <span className="browser-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="browser-address">{previewHost}</span>
                  <span className="browser-arrow">↗</span>
                </div>
                <div
                  className="modal-gallery-stage"
                  role="group"
                  aria-roledescription="carousel"
                  aria-label={`${project.title} screenshots`}
                  tabIndex={0}
                  onKeyDown={handleGalleryKeyDown}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.img
                      key={activeShot.src}
                      src={activeShot.src}
                      alt={activeShot.alt}
                      width="1440"
                      height="900"
                      loading="eager"
                      decoding="async"
                      initial={{ opacity: 0, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                    />
                  </AnimatePresence>

                  {gallery.length > 1 ? (
                    <>
                      <button
                        type="button"
                        className="modal-gallery-nav modal-gallery-nav--prev"
                        onClick={() => stepGallery(-1)}
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="modal-gallery-nav modal-gallery-nav--next"
                        onClick={() => stepGallery(1)}
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
                      </button>
                      <span className="modal-gallery-count" aria-hidden="true">
                        {activeIndex + 1} / {gallery.length}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>

              <p className="modal-gallery-caption" aria-live="polite">
                {activeShot.caption}
              </p>

              {gallery.length > 1 ? (
                <div className="modal-gallery-thumbs" role="group" aria-label="Choose a screenshot">
                  {gallery.map((shot, index) => (
                    <button
                      key={shot.src}
                      type="button"
                      className={`modal-gallery-thumb ${index === activeIndex ? 'is-active' : ''}`.trim()}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show screenshot ${index + 1}: ${shot.caption}`}
                      aria-pressed={index === activeIndex}
                    >
                      <img src={shot.src} alt="" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <ProjectVisual project={project} priority />
          )}

          <div className="modal-visual-meta">
            <span className="project-status project-status--solid">{project.status}</span>
            <span>{project.categoryLabel}</span>
          </div>
        </div>

        <div className="modal-content">
          <div className="modal-kicker">
            Project {project.number} <span>/</span> {project.categoryLabel}
          </div>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className="modal-tagline" id="project-modal-tagline">
            {project.tagline}
          </p>

          {project.overview ? (
            <section className="modal-section modal-section--lead">
              <h3>Overview</h3>
              <p className="modal-copy">{project.overview}</p>
            </section>
          ) : null}

          {project.problem ? (
            <section className="modal-section">
              <h3>The problem</h3>
              <p className="modal-copy">{project.problem}</p>
            </section>
          ) : null}

          {project.features?.length ? (
            <section className="modal-section">
              <h3>What it does</h3>
              <ul className="modal-highlights">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <span className="modal-check">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="modal-section">
            <h3>Tech stack</h3>
            <ul className="project-tech modal-tech">
              {project.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>

          {project.modules?.length ? (
            <section className="modal-section">
              <h3>Important pages & modules</h3>
              <ul className="modal-modules">
                {project.modules.map((module) => (
                  <li key={module.name}>
                    <span className="modal-module-name">{module.name}</span>
                    <span className="modal-module-detail">{module.detail}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.contribution?.length ? (
            <section className="modal-section">
              <h3>My contribution</h3>
              <ul className="modal-contribution">
                {project.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="modal-actions">
            {primaryLink ? (
              <a
                className="btn btn-primary"
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.links.live ? (
                  <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
                ) : (
                  <Mail size={16} strokeWidth={2} aria-hidden="true" />
                )}
                {primaryLabel}
              </a>
            ) : null}
            {project.links.github ? (
              <a
                className="btn btn-secondary"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon size={16} strokeWidth={2} aria-hidden="true" />
                Source code
              </a>
            ) : null}
          </div>

          {project.note ? <p className="modal-note">{project.note}</p> : null}
        </div>
      </motion.div>

      <button
        type="button"
        className="modal-close"
        onClick={onClose}
        ref={closeRef}
        aria-label="Close project details"
      >
        <X size={21} strokeWidth={1.9} aria-hidden="true" />
      </button>
    </motion.div>,
    document.body,
  );
}
