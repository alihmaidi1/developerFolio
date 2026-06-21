import "./Skills.scss";
import SoftwareSkill from "@/features/portfolio/components/software-skills/SoftwareSkill";
import {
  illustration,
  skillsSection,
} from "@/features/portfolio/config/portfolio.config";
import { Fade } from "@/shared/ui/reveal/Reveal";
import developerActivity from "@/assets/images/developerActivity.svg";
import codingPerson from "@/assets/lottie/codingPerson.json";
import DisplayLottie from "@/shared/ui/display-lottie/DisplayLottie";
import { useTheme } from "@/shared/theme/ThemeContext";
import { cn } from "@/shared/lib/cn";

export default function Skills() {
  const { isDark } = useTheme();
  if (!skillsSection.display) {
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
            <SoftwareSkill />
            <div>
              {skillsSection.skills.map((skills, i) => {
                return (
                  <p
                    key={i}
                    className={cn(
                      "subTitle skills-text",
                      isDark && "dark-mode",
                    )}
                  >
                    {skills}
                  </p>
                );
              })}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
