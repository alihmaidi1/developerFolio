import "./TalkCard.scss";

import type { TalkDetails } from "@/features/portfolio/model/portfolio-content.types";
import { cn } from "@/shared/lib/cn";

interface TalkCardProps {
  talkDetails: TalkDetails;
}

export default function TalkCard({ talkDetails }: TalkCardProps) {
  return (
    <div>
      <div className="container">
        <div
          className={cn("rectangle", talkDetails.isDark && "dark-rectangle")}
        >
          <div className="diagonal-fill"></div>
          <div className="talk-card-title">{talkDetails.title}</div>
          <p className="talk-card-subtitle">{talkDetails.subtitle}</p>

          <div className="card-footer-button-div">
            <a
              href={talkDetails.slides_url}
              target="_blank"
              rel="noreferrer"
              className="talk-button"
            >
              Slides
            </a>
            <a
              href={talkDetails.event_url}
              target="_blank"
              rel="noreferrer"
              className="talk-button"
            >
              Event
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
