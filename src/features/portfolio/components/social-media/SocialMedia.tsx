import "./SocialMedia.scss";
import { usePortfolioSettings } from "@/features/portfolio/hooks/usePortfolioSettings";

export default function SocialMedia() {
  const settingsQuery = usePortfolioSettings();
  const links = settingsQuery.data?.socialLinks ?? [];

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="social-media-div">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          className="icon-button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          title={link.name}
        >
          <i className={link.iconClassName}></i>
          <span></span>
        </a>
      ))}
    </div>
  );
}
