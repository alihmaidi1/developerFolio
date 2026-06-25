import { useQuery } from "@tanstack/react-query";
import "./Skills.scss";
import {
  illustration,
  skillsSection,
} from "@/features/portfolio/config/portfolio.config";
import { getPublishedSkills } from "@/features/portfolio/api/public-skills.api";
import { Fade } from "@/shared/ui/reveal/Reveal";
import developerActivity from "@/assets/images/developerActivity.svg";
import codingPerson from "@/assets/lottie/codingPerson.json";
import DisplayLottie from "@/shared/ui/display-lottie/DisplayLottie";
import { useTheme } from "@/shared/theme/ThemeContext";
import { cn } from "@/shared/lib/cn";

export default function Skills() {
  const { isDark } = useTheme();
  const skillsQuery = useQuery({
    queryKey: ["portfolio", "skills"],
    queryFn: getPublishedSkills,
    staleTime: 60_000,
  });

  const statements = skillsQuery.data?.statements ?? [];
  const softwareSkills = skillsQuery.data?.softwareSkills ?? [];

  if (statements.length === 0 && softwareSkills.length === 0) {
    return null;
  }

  return (
    <div className={cn("main", isDark && "dark-mode")} id="skills">
      <div className="skills-main-div">
        <Fade left duration={1000}>
          <div className="skills-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={codingPerson} />
            ) : (
              <img alt="Man Working" src={developerActivity}></img>
            )}
          </div>
        </Fade>
        <Fade right duration={1000}>
          <div className="skills-text-div">
            <h1 className={cn("skills-heading", isDark && "dark-mode")}>
              {skillsSection.title}{" "}
            </h1>
            <p
              className={cn(
                "subTitle skills-text-subtitle",
                isDark && "dark-mode",
              )}
            >
              {skillsSection.subTitle}
            </p>
            {softwareSkills.length > 0 && (
              <div>
                <div className="software-skills-main-div">
                  <ul className="dev-icons">
                    {softwareSkills.map((skill) => (
                      <li
                        key={skill.id}
                        className="software-skill-inline"
                        data-skill={skill.name}
                      >
                        <i className={skill.iconClassName}></i>
                        <p>{skill.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div>
              {statements.map((statement) => (
                <p
                  key={statement.id}
                  className={cn("subTitle skills-text", isDark && "dark-mode")}
                >
                  {statement.text}
                </p>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
