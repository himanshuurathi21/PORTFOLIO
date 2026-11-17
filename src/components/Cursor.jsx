import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'motion/react';

export default function Cursor() {
  const reduceMotion = useReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches || reduceMotion) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = null;
    let hasMoved = false;

    const render = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };

    const onMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!hasMoved) {
        hasMoved = true;
        document.documentElement.classList.add('has-custom-cursor');
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        frame = window.requestAnimationFrame(render);
        setEnabled(true);
      }
    };

    const onOver = (event) => {
      const target = event.target.closest(
        'a, button, [role="button"], .skill-chip, .project-card, [data-cursor="hover"]',
      );
      const textField = event.target.closest('input, textarea, select');
      ring.classList.toggle('is-hovering', Boolean(target));
      ring.classList.toggle('is-hidden', Boolean(textField));
      dot.classList.toggle('is-hidden', Boolean(textField));
    };

    const onDown = () => ring.classList.add('is-pressed');
    const onUp = () => ring.classList.remove('is-pressed');
    const onLeave = () => {
      document.documentElement.classList.remove('has-custom-cursor');
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      setEnabled(false);
      if (frame) window.cancelAnimationFrame(frame);
      frame = null;
      hasMoved = false;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return createPortal(
    <div className={`cursor ${enabled ? 'is-visible' : ''}`} aria-hidden="true">
      <span className="cursor-dot" ref={dotRef} />
      <span className="cursor-ring" ref={ringRef} />
    </div>,
    document.body,
  );
}
