import { motion, useReducedMotion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1];

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 26,
  as = 'div',
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease }}
      {...rest}
    >
      {children}
    </Component>
  );
}
