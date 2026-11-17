import { useRef } from 'react';
import { useReducedMotion } from 'motion/react';

export default function TiltCard({ children, className = '', maxTilt = 4 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const handleMove = (event) => {
    if (reduceMotion || !ref.current || event.pointerType === 'touch') return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;

    ref.current.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
    ref.current.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
    ref.current.style.setProperty('--tilt-mx', `${(x * 100).toFixed(1)}%`);
    ref.current.style.setProperty('--tilt-my', `${(y * 100).toFixed(1)}%`);
    ref.current.classList.add('is-tilting');
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--tilt-x', '0deg');
    ref.current.style.setProperty('--tilt-y', '0deg');
    ref.current.classList.remove('is-tilting');
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
