import { useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Brain,
  Briefcase,
  Code2,
  Database,
  FileText,
  GraduationCap,
  Heart,
  Layers3,
  MapPin,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { academic, academicMilestones, certGroups, certSummary } from '../data/credentials';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import CertificateLightbox from './CertificateLightbox';

const certIconMap = {
  award: Award,
  chart: BarChart3,
  code: Code2,
  briefcase: Briefcase,
  sparkles: Sparkles,
  brain: Brain,
  heart: Heart,
  layers: Layers3,
  file: FileText,
  database: Database,
  trophy: Trophy,
};

function CertCard({ cert, group, onPreview }) {
  const Icon = certIconMap[cert.icon] || Award;
  const label = `${group.label} — ${cert.name}`;

  const content = (
    <>
      <span className={`cert-icon cert-icon--${group.accent}`}>
        <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="cert-card-copy">
        <small>{group.id === 'hackathons' ? 'Hackathon participation' : group.label}</small>
        <strong>{cert.name}</strong>
      </span>
      <span className="cert-format">
        {cert.format === 'image' ? 'Image' : 'PDF'}
        <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
      </span>
    </>
  );

  if (cert.format === 'image') {
    return (
      <button
        type="button"
        className={`cert-card cert-card--${group.accent}`}
        onClick={() => onPreview(cert)}
        aria-label={`Preview certificate: ${label}`}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      className={`cert-card cert-card--${group.accent}`}
      href={cert.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open certificate PDF: ${label}`}
    >
      {content}
    </a>
  );
}

export default function Education() {
  const [activeGroupId, setActiveGroupId] = useState(certGroups[0].id);
  const [preview, setPreview] = useState(null);
  const [previewGroup, setPreviewGroup] = useState(null);
  const tabRefs = useRef([]);
  const activeGroup = certGroups.find((group) => group.id === activeGroupId) || certGroups[0];

  const handleTabKey = (event, index) => {
    let nextIndex = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % certGroups.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + certGroups.length) % certGroups.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = certGroups.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      setActiveGroupId(certGroups[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const openPreview = (cert, group) => {
    setPreview(cert);
    setPreviewGroup(group);
  };

  return (
    <section id="education" className="section education-section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Credentials"
          id="education-title"
          title={
            <>
              Learning in public. <em>Certified.</em>
            </>
          }
          description="A degree in progress, three academic signals, 15 certifications and four hackathons — all earned in parallel with real projects."
        />

        <div className="education-grid">
          <Reveal as="article" className="academic-card" delay={0.02}>
            <div className="academic-card-top">
              <span className="academic-label">
                <GraduationCap size={16} strokeWidth={1.8} aria-hidden="true" />
                Student record
              </span>
              <span className="academic-status">Current</span>
            </div>

            <div className="academic-main">
              <p className="academic-kicker">B.Tech / Information Technology</p>
              <h3>{academic.school}</h3>
              <p className="academic-location">
                <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
                {academic.location}
              </p>
            </div>

            <div className="academic-stats">
              <div className="academic-cgpa">
                <span>CGPA</span>
                <strong>{academic.cgpa}</strong>
              </div>
              <div>
                <span>Duration</span>
                <strong>{academic.period}</strong>
              </div>
              <div>
                <span>Degree</span>
                <strong>B.Tech IT</strong>
              </div>
            </div>

            <div className="academic-footer">
              <span>MIT AOE / PUNE / INDIA</span>
              <span className="academic-barcode" aria-hidden="true">
                ||| | || ||| | || ||| || |
              </span>
            </div>
            <span className="academic-watermark" aria-hidden="true">
              MIT
            </span>
          </Reveal>

          <div className="education-side">
            <Reveal className="report-card" delay={0.08}>
              <div className="report-card-head">
                <span>Academic signals</span>
                <span>Percentile / %</span>
              </div>
              <ul>
                {academicMilestones.map((milestone) => (
                  <li key={milestone.label}>
                    <span className="report-label">
                      {milestone.label}
                      <small>{milestone.year}</small>
                    </span>
                    <span className="report-value">
                      {milestone.value}
                      <small>{milestone.suffix}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="cert-summary" delay={0.12}>
              {certSummary.slice(0, 3).map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
              <div className="cert-summary-total">
                <strong>15</strong>
                <span>certifications total</span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="certs-block">
          <Reveal className="certs-heading">
            <div>
              <span className="certs-kicker">The certificate drawer</span>
              <h3>Proof of the extra mile.</h3>
            </div>
            <p>
              15 certifications across IBM, Anthropic, Cisco and Reliance Foundation, plus 4
              hackathon participations. Open any card to view the source.
            </p>
          </Reveal>

          <div className="cert-tabs" role="tablist" aria-label="Certification providers">
            {certGroups.map((group, index) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                id={`cert-tab-${group.id}`}
                aria-selected={activeGroup.id === group.id}
                aria-controls={`cert-panel-${group.id}`}
                tabIndex={activeGroup.id === group.id ? 0 : -1}
                className={`cert-tab ${activeGroup.id === group.id ? 'is-active' : ''}`.trim()}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                onClick={() => setActiveGroupId(group.id)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                <span>{group.label}</span>
                <span className="cert-tab-count">{group.count}</span>
              </button>
            ))}
          </div>

          {certGroups.map((group) => (
            <div
              key={group.id}
              id={`cert-panel-${group.id}`}
              role="tabpanel"
              aria-labelledby={`cert-tab-${group.id}`}
              className="cert-panel"
              hidden={activeGroup.id !== group.id}
            >
              <div className="cert-panel-head">
                <p>{group.description}</p>
                <span>
                  {String(group.certs.length).padStart(2, '0')}{' '}
                  {group.id === 'hackathons'
                    ? 'participations'
                    : group.certs.length === 1
                      ? 'certificate'
                      : 'certificates'}
                </span>
              </div>
              <div className="cert-grid">
                {group.certs.map((cert) => (
                  <CertCard
                    key={cert.name}
                    cert={cert}
                    group={group}
                    onPreview={(item) => openPreview(item, group)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {preview ? (
          <CertificateLightbox
            certificate={preview}
            org={previewGroup?.label || ''}
            onClose={() => {
              setPreview(null);
              setPreviewGroup(null);
            }}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
