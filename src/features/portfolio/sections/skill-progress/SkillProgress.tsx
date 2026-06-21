import "./SkillProgress.scss";
import {
  illustration,
  techStack,
} from "@/features/portfolio/config/portfolio.config";
import { Fade } from "@/shared/ui/reveal/Reveal";
import skillIllustration from "@/assets/images/skill.svg";
import Build from "@/assets/lottie/build.json";
import DisplayLottie from "@/shared/ui/display-lottie/DisplayLottie";

export default function SkillProgress() {
  if (techStack.viewSkillBars) {
    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="skills-container">
          <div className="skills-bar">
            <h1 className="skills-heading">Proficiency</h1>
            {techStack.experience.map((exp, i) => {
              const progressStyle = {
                width: exp.progressPercentage,
              };
              return (
                <div key={i} className="skill">
                  <p>{exp.Stack}</p>
                  <div className="meter">
                    <span style={progressStyle}></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img alt="Skills" src={skillIllustration} />
            )}
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}
