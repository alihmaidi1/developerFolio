import { useI18n } from "../../hooks/useI18n";
import { lenis } from "../../hooks/useScroll";
import { ButtonRound } from "./Button";
import { ArrowRightLong } from "./icons";
import { LangSwitch } from "./LangSwitch";
import { Link } from "./Link";
import { NotchSection } from "./Notch";
import { Social } from "./Social";

export function Footer({
  withSocial = true,
  className = "",
}: {
  withSocial?: boolean;
  className?: string;
}) {
  const { t, locale } = useI18n();
  const showAttribution = import.meta.env.VITE_SHOW_ATTRIBUTION !== "false";

  return (
    <footer className={["footer", className].filter(Boolean).join(" ")}>
      <NotchSection className="footer-notch" />
      <div className="footer-content">
        <button
          type="button"
          className="footer-back-to-top"
          onClick={() => lenis.value?.scrollTo(0)}
          data-cursor="circle-white"
          data-sound="click"
        >
          <ButtonRound
            renderAs="div"
            variant="border"
            className="children-unclickable"
            data-hoversound="hover"
          >
            <ArrowRightLong className="footer-back-to-top-icon" />
          </ButtonRound>
        </button>
        <div className="footer-top">
          {withSocial ? <Social /> : null}
          <div className="footer-top-links">
            <div className="footer-top-links-legal">
              <Link
                href={locale === "de" ? "/de/privacy" : "/privacy"}
                className="footer-link"
                external
                data-cursor="circle-white"
              >
                {t("privacy")}
              </Link>
              <Link
                href={locale === "de" ? "/de/legal" : "/legal"}
                className="footer-link children-unclickable"
                external
                data-cursor="circle-white"
              >
                {t("legal")}
              </Link>
            </div>
            <LangSwitch />
          </div>
        </div>
        <div className="footer-credits">
          {showAttribution ? (
            <div className="footer-credits-built">
              <p>{t("original-concept-by")}</p>
              <Link
                href="https://david-hckh.com"
                className="footer-link children-unclickable"
                external
              >
                David Heckhoff
              </Link>
            </div>
          ) : null}
          <div className="footer-credits-music">
            <p>{t("music-produced-by")}</p>
            <Link
              href="https://soundcloud.com/hmsurf"
              className="footer-link children-unclickable"
              external
            >
              HM Surf
            </Link>
          </div>
          <p>© {new Date().getFullYear()} David Heckhoff</p>
        </div>
      </div>
    </footer>
  );
}
