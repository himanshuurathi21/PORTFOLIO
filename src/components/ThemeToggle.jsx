import { AnimatePresence, motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle, className = '' }) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      role="switch"
      aria-checked={isLight}
      aria-label="Light theme"
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      onClick={onToggle}
    >
      <span className="theme-toggle-orbit" aria-hidden="true" />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="theme-toggle-icon"
          initial={{ rotate: -70, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 70, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {isLight ? (
            <Moon size={17} strokeWidth={1.9} aria-hidden="true" />
          ) : (
            <Sun size={18} strokeWidth={1.9} aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
