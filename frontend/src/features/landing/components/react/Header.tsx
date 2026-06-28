import { useNavigate } from "react-router-dom";
import { isFeatureEnabled } from "../../utils/features";
import { useAgent } from "../../hooks/useAgent";
import { useHowler } from "../../hooks/useHowler";
import { useI18n } from "../../hooks/useI18n";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import { useSignal } from "../../hooks/useSignal";
import { lenis } from "../../hooks/useScroll";
import { projectIdSignal } from "../../store/routeStore";
import { ArrowRight, LogoIcon } from "./icons";
import { Button, ButtonRound } from "./Button";
import { SoundsToggle } from "./SoundsToggle";

export function Header() {
  const navigate = useNavigate();
  const projectId = useSignal(projectIdSignal);
  const { t } = useI18n();
  const { settings } = usePortfolioData();
  const { isTouch } = useAgent();
  const isDarkTheme = projectId !== null;
  useHowler(isTouch);

  const contactEmail = settings?.contact.email;
  const contactHref = contactEmail ? `mailto:${contactEmail}` : "";

  const handleBackClick = () => {
    navigate("/");
  };

  const handleLogoClick = () => {
    lenis.value?.scrollTo(0);
  };

  return (
    <header
      className={[
        "header",
        isDarkTheme ? "header-dark" : "",
        "header-scrolled",
        projectId !== null ? `project-${projectId}` : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="header-left">
        {projectId !== null ? (
          <ButtonRound
            variant="accent"
            onClick={handleBackClick}
            aria-label={t("back-to-home")}
            className="header-back header-back-isProjectPage"
            data-cursor="circle-white"
            data-sound="click"
            data-hoversound="hover"
          >
            <ArrowRight className="header-back-icon" />
          </ButtonRound>
        ) : null}
      </div>
      <button
        type="button"
        className={[
          "header-logo",
          projectId !== null ? "header-logo-isProjectPage" : "",
          "header-logo-clickable",
          "children-unclickable",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleLogoClick}
        data-sound="click"
        data-hoversound="hover"
        data-cursor="circle-white"
      >
        <LogoIcon className="header-logo-image" />
      </button>
      <div className="header-right">
        <Button
          renderAs="a"
          variant="accent"
          aria-label={t("get-in-touch")}
          href={contactHref}
          className={[
            "header-get-in-touch",
            projectId !== null ? "header-get-in-touch-isProjectPage" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          data-cursor="circle-white"
          data-hoversound="hover"
        >
          {t("get-in-touch")}
        </Button>
        {isFeatureEnabled("sounds") ? (
          <SoundsToggle
            className="header-sounds-toggle"
            isDarkTheme={isDarkTheme}
          />
        ) : null}
      </div>
    </header>
  );
}
