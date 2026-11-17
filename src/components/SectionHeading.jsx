import Reveal from './Reveal';

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  id,
}) {
  return (
    <Reveal className={`section-heading section-heading--${align} ${className}`.trim()}>
      <div className="section-eyebrow">
        <span className="section-index">{index}</span>
        <span className="section-rule" aria-hidden="true" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {description ? <p className="section-description">{description}</p> : null}
    </Reveal>
  );
}
