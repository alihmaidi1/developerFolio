import { createRef } from "react";
import { Fade, Slide } from "@/shared/ui/reveal/Reveal";
import type { EducationSchool } from "@/features/portfolio/model/portfolio-content.types";
import { useTheme } from "@/shared/theme/ThemeContext";
import { cn } from "@/shared/lib/cn";
import "./EducationCard.scss";

interface EducationCardProps {
  school: EducationSchool;
}

function DescriptionBullets({ descBullets }: { descBullets?: string[] }) {
  return descBullets?.map((item, index) => (
    <li key={`${item}-${index}`} className="subTitle">
      {item}
    </li>
  ));
}

export default function EducationCard({ school }: EducationCardProps) {
  const imageRef = createRef<HTMLImageElement>();
  const { isDark } = useTheme();

  return (
    <div>
      <Fade left duration={1000}>
        <div className="education-card">
          <div className="education-card-left">
            <img
              crossOrigin="anonymous"
              ref={imageRef}
              className="education-roundedimg"
              src={school.logo}
              alt={school.schoolName}
            />
          </div>
          <div className="education-card-right">
            <h5 className="education-text-school">{school.schoolName}</h5>
            <div className="education-text-details">
              <h5
                className={cn(
                  "education-text-subHeader",
                  isDark && "dark-mode",
                )}
              >
                {school.subHeader}
              </h5>
              <p
                className={cn("education-text-duration", isDark && "dark-mode")}
              >
                {school.duration}
              </p>
              <p className="education-text-desc">{school.desc}</p>
              <div className="education-text-bullets">
                <ul>
                  <DescriptionBullets descBullets={school.descBullets} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Fade>
      <Slide left duration={2000}>
        <div className="education-card-border" />
      </Slide>
    </div>
  );
}
