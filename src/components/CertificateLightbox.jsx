import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { trapFocus } from '../utils/focus';

export default function CertificateLightbox({ certificate, org, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const root = document.getElementById('root');

    document.body.style.overflow = 'hidden';
    if (root) {
      root.setAttribute('inert', '');
      root.setAttribute('aria-hidden', 'true');
    }

    const timer = window.setTimeout(() => closeRef.current?.focus(), 50);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      trapFocus(event, dialogRef.current);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      if (root) {
        root.removeAttribute('inert');
        root.removeAttribute('aria-hidden');
      }
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="cert-lightbox"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-lightbox-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="cert-lightbox-close"
        onClick={onClose}
        ref={closeRef}
        aria-label="Close certificate preview"
      >
        <X size={21} strokeWidth={1.9} aria-hidden="true" />
      </button>
      <motion.figure
        className="cert-lightbox-figure"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={certificate.href} alt={`${certificate.name} certificate from ${org}`} />
        <figcaption>
          <span>
            <small>{org}</small>
            <strong id="cert-lightbox-title">{certificate.name}</strong>
          </span>
          <a href={certificate.href} target="_blank" rel="noopener noreferrer">
            Open full image
            <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
          </a>
        </figcaption>
      </motion.figure>
    </motion.div>,
    document.body,
  );
}
