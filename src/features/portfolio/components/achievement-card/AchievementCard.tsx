import type { AchievementCardData } from "@/features/portfolio/model/portfolio-content.types";
import { cn } from "@/shared/lib/cn";
import "./AchievementCard.scss";

interface AchievementCardProps {
  cardInfo: AchievementCardData;
  isDark: boolean;
}

export default function AchievementCard({
  cardInfo,
  isDark,
}: AchievementCardProps) {
  return (
    <div className={cn("certificate-card", isDark && "dark-mode")}>
      <div className="certificate-image-div">
        <img
          src={cardInfo.image}
          alt={cardInfo.imageAlt || "Card thumbnail"}
          className="card-image"
        />
      </div>
      <div className="certificate-detail-div">
        <h5 className={cn("card-title", isDark && "dark-mode")}>
          {cardInfo.title}
        </h5>
        <p className={cn("card-subtitle", isDark && "dark-mode")}>
          {cardInfo.description}
        </p>
      </div>
      <div className="certificate-card-footer">
        {cardInfo.footer
          .filter((link) => link.url)
          .map((link) => (
            <a
              key={`${link.name}-${link.url}`}
              className={cn("certificate-tag", isDark && "dark-mode")}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.name}
            </a>
          ))}
      </div>
    </div>
  );
}
