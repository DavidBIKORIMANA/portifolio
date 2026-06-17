import { SOCIALS } from '../../data/siteData';

export default function SocialLinks({ className = '' }) {
  return (
    <div className={className}>
      {SOCIALS.map(({ href, icon, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
          <i className={icon} />
        </a>
      ))}
    </div>
  );
}
