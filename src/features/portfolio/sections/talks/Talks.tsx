import "./Talks.scss";
import TalkCard from "@/features/portfolio/components/talk-card/TalkCard";
import { talkSection } from "@/features/portfolio/config/portfolio.config";
import { Fade } from "@/shared/ui/reveal/Reveal";
import { useTheme } from "@/shared/theme/ThemeContext";
import { cn } from "@/shared/lib/cn";

export default function Talks() {
  const { isDark } = useTheme();
  if (!talkSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="talks">
        <div className="talk-header">
          <h1 className="talk-header-title">{talkSection.title}</h1>
          <p
            className={cn(
              "talk-header-subtitle",
              isDark ? "dark-mode" : "subTitle",
            )}
          >
            {talkSection.subtitle}
          </p>
          {talkSection.talks.map((talk, i) => {
            return (
              <TalkCard
                key={i}
                talkDetails={{
                  title: talk.title,
                  subtitle: talk.subtitle,
                  slides_url: talk.slides_url,
                  event_url: talk.event_url,
                  isDark,
                }}
              />
            );
          })}
        </div>
      </div>
    </Fade>
  );
}
