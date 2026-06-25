import "./Contact.scss";
import SocialMedia from "@/features/portfolio/components/social-media/SocialMedia";
import { illustration } from "@/features/portfolio/config/portfolio.config";
import { usePortfolioSettings } from "@/features/portfolio/hooks/usePortfolioSettings";
import { Fade } from "@/shared/ui/reveal/Reveal";
import email from "@/assets/lottie/email.json";
import DisplayLottie from "@/shared/ui/display-lottie/DisplayLottie";
import { useTheme } from "@/shared/theme/ThemeContext";
import contactMailDark from "@/assets/images/contactMailDark.svg";
import { cn } from "@/shared/lib/cn";

export default function Contact() {
  const { isDark } = useTheme();
  const settingsQuery = usePortfolioSettings();
  const contact = settingsQuery.data?.contact;

  if (!contact) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            <h1 className="heading contact-title">{contact.title}</h1>
            <p
              className={cn(
                "contact-subtitle",
                isDark ? "dark-mode" : "subTitle",
              )}
            >
              {contact.subtitle}
            </p>
            <div className={cn("contact-text-div", isDark && "dark-mode")}>
              {contact.phone && (
                <>
                  <a className="contact-detail" href={"tel:" + contact.phone}>
                    {contact.phone}
                  </a>
                  <br />
                  <br />
                </>
              )}
              {contact.email && (
                <>
                  <a
                    className="contact-detail-email"
                    href={"mailto:" + contact.email}
                  >
                    {contact.email}
                  </a>
                  <br />
                  <br />
                </>
              )}
              <SocialMedia />
            </div>
          </div>
          <div className="contact-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={email} />
            ) : (
              <img alt="Man working" src={contactMailDark}></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
