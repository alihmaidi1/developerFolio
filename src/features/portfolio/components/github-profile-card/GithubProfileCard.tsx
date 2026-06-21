import "./GithubProfileCard.scss";
import SocialMedia from "@/features/portfolio/components/social-media/SocialMedia";
import {
  contactInfo,
  isHireable,
} from "@/features/portfolio/config/portfolio.config";
import emoji from "react-easy-emoji";
import { MapPin } from "lucide-react";
import { Fade } from "@/shared/ui/reveal/Reveal";
import type { GithubProfile } from "@/features/portfolio/model/portfolio.schemas";

interface GithubProfileCardProps {
  prof: GithubProfile;
}

export default function GithubProfileCard({ prof }: GithubProfileCardProps) {
  const hireableLabel = isHireable ? "Yes" : "No";
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="contact">
        <h1 className="prof-title">Reach Out to me!</h1>
        <div className="row">
          <div className="main-content-profile">
            <div className="blog-header">
              <p className="subTitle blog-subtitle">{contactInfo.subtitle}</p>
            </div>
            <h2 className="bio-text">"{emoji(String(prof.bio))}"</h2>
            {prof.location !== null && (
              <div className="location-div">
                <span className="desc-prof">
                  <MapPin aria-hidden size={18} />
                  {prof.location}
                </span>
              </div>
            )}
            <div className="opp-div">
              <span className="desc-prof">
                Open for opportunities: {hireableLabel}
              </span>
            </div>
            <SocialMedia />
          </div>
          <div className="image-content-profile">
            <img
              src={prof.avatarUrl}
              alt={prof.name}
              className="profile-image"
            />
          </div>
        </div>
      </div>
    </Fade>
  );
}
