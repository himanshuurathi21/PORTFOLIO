const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function toRoots(roots) {
  return (Array.isArray(roots) ? roots : [roots]).filter(Boolean);
}

function getFocusableElements(roots) {
  const seen = new Set();

  return toRoots(roots)
    .flatMap((root) => Array.from(root.querySelectorAll(FOCUSABLE_SELECTOR)))
    .filter((element) => {
      if (seen.has(element)) return false;
      seen.add(element);
      return element.getClientRects().length > 0 && !element.closest('[inert]');
    });
}

/**
 * Keeps Tab and Shift+Tab inside one or more containers. Used by dialogs and
 * the full-screen mobile navigation so keyboard users never land on content
 * hidden behind an overlay.
 */
export function trapFocus(event, roots) {
  if (event.key !== 'Tab') return;

  const rootList = toRoots(roots);
  const focusable = getFocusableElements(rootList);
  if (!focusable.length) return;

  const active = document.activeElement;
  const isInside = rootList.some((root) => root.contains(active));
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (!isInside) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
    return;
  }

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}
