import { Fade } from "@/shared/ui/reveal/Reveal";
import manOnTable from "@/assets/images/manOnTable.svg";
import resume from "@/assets/documents/resume.pdf";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "@/assets/lottie/landingPerson.json";
import DisplayLottie from "@/shared/ui/display-lottie/DisplayLottie";
import SocialMedia from "@/features/portfolio/components/social-media/SocialMedia";
import Button from "@/shared/ui/button/Button";
import {
  illustration,
  greeting,
} from "@/features/portfolio/config/portfolio.config";
import { useTheme } from "@/shared/theme/ThemeContext";
import { cn } from "@/shared/lib/cn";

export default function Greeting() {
  const { isDark } = useTheme();
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1 className={cn("greeting-text", isDark && "dark-mode")}>
                {" "}
                {greeting.title}{" "}
                <span className="wave-emoji">{emoji("👋")}</span>
              </h1>
              <p
                className={cn(
                  "greeting-text-p",
                  isDark ? "dark-mode" : "subTitle",
                )}
              >
                {greeting.subTitle}
              </p>
              <div id="resume" className="empty-div"></div>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text="Contact me" href="#contact" />
                {greeting.resumeLink && (
                  <Button
                    text="Download my resume"
                    href={resume}
                    download="Resume.pdf"
                    className="download-link-button"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img alt="man sitting on table" src={manOnTable}></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
