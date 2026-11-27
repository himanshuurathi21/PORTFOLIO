import { Mail } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from './BrandIcons';
import { socials } from '../data/content';

const links = [
  {
    label: 'GitHub',
    href: socials.github,
    icon: GithubIcon,
    handle: '@himanshuurathi21',
  },
  {
    label: 'LinkedIn',
    href: socials.linkedin,
    icon: LinkedinIcon,
    handle: 'himanshu-rathi',
  },
  {
    label: 'Instagram',
    href: socials.instagram,
    icon: InstagramIcon,
    handle: '@himanshuu_rathi',
  },
  {
    label: 'Email',
    href: socials.emailCompose,
    icon: Mail,
    handle: socials.email,
  },
];

export default function SocialLinks({ className = '', labels = false, size = 18 }) {
  return (
    <div className={`social-links ${className}`.trim()} role="group" aria-label="Social links">
      {links.map(({ label, href, icon: Icon, handle }) => (
        <a
          key={label}
          className={`social-link ${labels ? 'social-link--labelled' : ''}`.trim()}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels ? undefined : `${label} - ${handle} (opens in a new tab)`}
        >
          <span className="social-link-icon">
            <Icon size={size} strokeWidth={1.8} aria-hidden="true" />
          </span>
          {labels ? (
            <>
              <span className="social-link-copy">
                <span>{label}</span>
                <strong>{handle}</strong>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </>
          ) : null}
        </a>
      ))}
    </div>
  );
}
