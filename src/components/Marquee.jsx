export default function Marquee({
  items,
  duration = 38,
  className = '',
  separator = '✦',
  reverse = false,
}) {
  const group = (
    <div className="marquee-group" aria-hidden="true">
      {items.map((item, index) => (
        <span className="marquee-item" key={`${item}-${index}`}>
          {item}
          <span className="marquee-separator">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee ${className}`.trim()}
      style={{
        '--marquee-duration': `${duration}s`,
        '--marquee-direction': reverse ? 'reverse' : 'normal',
      }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {group}
        {group}
      </div>
    </div>
  );
}
