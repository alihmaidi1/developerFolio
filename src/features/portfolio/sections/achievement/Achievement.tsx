import "./Achievement.scss";
import AchievementCard from "@/features/portfolio/components/achievement-card/AchievementCard";
import { achievementSection } from "@/features/portfolio/config/portfolio.config";
import { Fade } from "@/shared/ui/reveal/Reveal";
import { useTheme } from "@/shared/theme/ThemeContext";
import { cn } from "@/shared/lib/cn";
export default function Achievement() {
  const { isDark } = useTheme();
  if (!achievementSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="achievements">
        <div className="achievement-main-div">
          <div className="achievement-header">
            <h1
              className={cn(
                "heading achievement-heading",
                isDark && "dark-mode",
              )}
            >
              {achievementSection.title}
            </h1>
            <p
              className={cn(
                "subTitle achievement-subtitle",
                isDark && "dark-mode",
              )}
            >
              {achievementSection.subtitle}
            </p>
          </div>
          <div className="achievement-cards-div">
            {achievementSection.achievementsCards.map((card, i) => {
              return (
                <AchievementCard
                  key={i}
                  isDark={isDark}
                  cardInfo={{
                    title: card.title,
                    description: card.subtitle,
                    image: card.image,
                    imageAlt: card.imageAlt,
                    footer: card.footerLink,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
