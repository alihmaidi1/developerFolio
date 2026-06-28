import { useSignal } from "../../../hooks/useSignal";
import { useI18n } from "../../../hooks/useI18n";
import { usePortfolioData } from "../../../hooks/usePortfolioData";
import { preloaderVisible } from "../../../hooks/usePreloader";
import { Banner } from "../Banner";

export function Hero({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const { settings } = usePortfolioData();
  const isPreloaderVisible = useSignal(preloaderVisible);

  const username = settings?.greeting.username ?? "";
  const nameParts = username.split(" ");
  const jobTitle = settings?.greeting.title ?? t("job-title");

  return (
    <div className={["hero", className].filter(Boolean).join(" ")} id="hero">
      <div className="hero-content grid">
        <div className="hero-content-inner" id="hero-content-inner">
          <div className="hero-content-copys">
            <h1 className="hero-title">
              {nameParts.map((part, i) => (
                <span key={part}>
                  {part}
                  {i < nameParts.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>
            {!isPreloaderVisible ? (
              <Banner className="hero-banner" copy={jobTitle} animated />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
