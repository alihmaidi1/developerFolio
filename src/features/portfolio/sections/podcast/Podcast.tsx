import "./Podcast.scss";
import { podcastSection } from "@/features/portfolio/config/portfolio.config";
import { Fade } from "@/shared/ui/reveal/Reveal";
import { useTheme } from "@/shared/theme/ThemeContext";
import { cn } from "@/shared/lib/cn";

export default function Podcast() {
  const { isDark } = useTheme();

  if (!podcastSection)
    console.error("podcastSection object for Podcast section is missing");

  if (!podcastSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main">
        <div className="podcast-header">
          <h1 className="podcast-header-title">{podcastSection.title}</h1>
          <p
            className={cn(
              "podcast-header-subtitle",
              isDark ? "dark-mode" : "subTitle",
            )}
          >
            {podcastSection.subtitle}
          </p>
        </div>
        <div className="podcast-main-div">
          {podcastSection.podcast.map((podcastLink, i) => {
            if (!podcastLink) {
              console.log(
                `Podcast link for ${podcastSection.title} is missing`,
              );
            }
            return (
              <div key={i}>
                <iframe
                  className="podcast"
                  src={podcastLink}
                  frameBorder="0"
                  scrolling="no"
                  title="Podcast"
                ></iframe>
              </div>
            );
          })}
        </div>
      </div>
    </Fade>
  );
}
