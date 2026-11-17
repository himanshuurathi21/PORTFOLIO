export default function ProjectVisual({ project, priority = false, className = '' }) {
  return (
    <div className={`project-cover ${className}`.trim()}>
      <img
        src={project.cover}
        alt={project.coverAlt || `${project.title} project cover`}
        width="1440"
        height="900"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
