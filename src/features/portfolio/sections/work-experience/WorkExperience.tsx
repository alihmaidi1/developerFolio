import { useQuery } from "@tanstack/react-query";
import "./WorkExperience.scss";
import ExperienceCard from "@/features/portfolio/components/experience-card/ExperienceCard";
import { getPublishedWorkExperience } from "@/features/portfolio/api/public-work-experience.api";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import { Fade } from "@/shared/ui/reveal/Reveal";
import { useTheme } from "@/shared/theme/ThemeContext";

export default function WorkExperience() {
  const { isDark } = useTheme();
  const workExperienceQuery = useQuery({
    queryKey: ["portfolio", "work-experience"],
    queryFn: getPublishedWorkExperience,
    staleTime: 60_000,
  });

  const entries = workExperienceQuery.data ?? [];

  if (entries.length === 0) {
    return null;
  }

  return (
    <div id="experience">
      <Fade bottom duration={1000} distance="20px">
        <div className="experience-container" id="workExperience">
          <div>
            <h1 className="experience-heading">Experiences</h1>
            <div className="experience-cards-div">
              {entries.map((entry) => (
                <ExperienceCard
                  key={entry.id}
                  isDark={isDark}
                  cardInfo={{
                    company: entry.company,
                    desc: entry.description ?? "",
                    date: entry.date,
                    companylogo: resolveAssetUrl(entry.companyLogoUrl) ?? "",
                    role: entry.role,
                    descBullets: entry.descriptionBullets,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
