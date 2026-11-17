import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Code2,
  LayoutDashboard,
  Server,
  Sparkles,
  Terminal,
  Users,
  Wrench,
} from 'lucide-react';
import { skillGroups, skillLevels } from '../data/skills';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const iconMap = {
  code: Code2,
  layout: LayoutDashboard,
  server: Server,
  sparkles: Sparkles,
  wrench: Wrench,
  users: Users,
};

const levelClass = {
  Proficient: 'is-proficient',
  Familiar: 'is-familiar',
  Learning: 'is-learning',
};

export default function Skills() {
  const [selected, setSelected] = useState(null);
  const totalSkills = useMemo(
    () => skillGroups.reduce((total, group) => total + group.skills.length, 0),
    [],
  );

  const selectSkill = (group, skill) => {
    setSelected((current) =>
      current?.skill.name === skill.name && current?.group.id === group.id
        ? null
        : { group, skill },
    );
  };

  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-title">
      <div className="container">
        <div className="skills-heading-row">
          <SectionHeading
            index="05"
            eyebrow="Stack"
            id="skills-title"
            title={
              <>
                Tools for making <em>ideas real.</em>
              </>
            }
            description="No logo walls. Just the languages, frameworks, and platforms I actually use — with receipts."
          />
          <Reveal className="skills-legend" delay={0.1}>
            <span className="skills-legend-label">Proficiency</span>
            {skillLevels.map((level) => (
              <span className="legend-item" key={level.label}>
                <span className={`level-dot ${level.className}`} aria-hidden="true" />
                {level.label}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="skill-grid">
          {skillGroups.map((group, index) => {
            const Icon = iconMap[group.icon] || Code2;
            return (
              <Reveal
                as="article"
                className={`skill-card accent-${group.accent}`}
                key={group.id}
                delay={index * 0.04}
              >
                <div className="skill-card-head">
                  <span className="skill-card-icon">
                    <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="skill-card-count">
                    {String(group.skills.length).padStart(2, '0')} tools
                  </span>
                </div>
                <h3>{group.title}</h3>
                <p className="skill-card-blurb">{group.blurb}</p>
                <div className="skill-chips">
                  {group.skills.map((skill) => {
                    const isActive =
                      selected?.group.id === group.id && selected?.skill.name === skill.name;
                    return (
                      <button
                        type="button"
                        className={`skill-chip ${isActive ? 'is-active' : ''}`.trim()}
                        key={skill.name}
                        onClick={() => selectSkill(group, skill)}
                        aria-pressed={isActive}
                        title={`${skill.name}: ${skill.level} — ${skill.proof}`}
                      >
                        <span
                          className={`level-dot ${levelClass[skill.level] || 'is-familiar'}`}
                          aria-hidden="true"
                        />
                        {skill.name}
                        <span className="sr-only"> — {skill.level}</span>
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="stack-probe" delay={0.08}>
          <div className="stack-probe-head">
            <span className="stack-probe-label">
              <Terminal size={15} strokeWidth={2} aria-hidden="true" />
              Stack probe
            </span>
            <span className="stack-probe-count">
              {totalSkills} tools indexed / click any chip
            </span>
          </div>

          <div className="stack-probe-body" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {selected ? (
                <motion.div
                  key={`${selected.group.id}-${selected.skill.name}`}
                  className="probe-result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="probe-main">
                    <span className="probe-group">{selected.group.title}</span>
                    <h3>{selected.skill.name}</h3>
                    <span
                      className={`probe-level ${levelClass[selected.skill.level] || 'is-familiar'}`}
                    >
                      <span
                        className={`level-dot ${levelClass[selected.skill.level] || 'is-familiar'}`}
                        aria-hidden="true"
                      />
                      {selected.skill.level}
                    </span>
                  </div>
                  <div className="probe-proof">
                    <span className="probe-proof-label">Where it shows up</span>
                    <p>{selected.skill.proof}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  className="probe-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="probe-caret" aria-hidden="true">
                    █
                  </span>
                  <p>
                    Select a skill to see the project, role, or certification where it did real
                    work.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="probe-mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <em>HR</em>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
