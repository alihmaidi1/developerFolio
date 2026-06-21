import type { ExperienceData } from "@/features/portfolio/model/portfolio-content.types";
import { cn } from "@/shared/lib/cn";
import "./ExperienceCard.scss";

interface ExperienceCardProps {
  cardInfo: ExperienceData;
  isDark: boolean;
}

function DescriptionBullets({
  descBullets,
  isDark,
}: {
  descBullets?: string[];
  isDark: boolean;
}) {
  return descBullets?.map((item, index) => (
    <li
      key={`${item}-${index}`}
      className={cn("subTitle", isDark && "dark-mode-text")}
    >
      {item}
    </li>
  ));
}

export default function ExperienceCard({
  cardInfo,
  isDark,
}: ExperienceCardProps) {
  return (
    <div className={cn(isDark ? "experience-card-dark" : "experience-card")}>
      <div className="experience-banner">
        <div className="experience-blurred_div" />
        <div className="experience-div-company">
          <h5 className="experience-text-company">{cardInfo.company}</h5>
        </div>
        <img
          crossOrigin="anonymous"
          className="experience-roundedimg"
          src={cardInfo.companylogo}
          alt={cardInfo.company}
        />
      </div>
      <div className="experience-text-details">
        <h5 className={cn("experience-text-role", isDark && "dark-mode-text")}>
          {cardInfo.role}
        </h5>
        <h5 className={cn("experience-text-date", isDark && "dark-mode-text")}>
          {cardInfo.date}
        </h5>
        <p
          className={cn(
            "subTitle experience-text-desc",
            isDark && "dark-mode-text",
          )}
        >
          {cardInfo.desc}
        </p>
        <ul>
          <DescriptionBullets
            descBullets={cardInfo.descBullets}
            isDark={isDark}
          />
        </ul>
      </div>
    </div>
  );
}
