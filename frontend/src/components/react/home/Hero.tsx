import { useSignal } from "../../../hooks/useSignal";
import { useI18n } from "../../../hooks/useI18n";
import { preloaderVisible } from "../../../hooks/usePreloader";
import { Banner } from "../Banner";

export function Hero({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const isPreloaderVisible = useSignal(preloaderVisible);

  return (
    <div className={["hero", className].filter(Boolean).join(" ")} id="hero">
      <div className="hero-content grid">
        <div className="hero-content-inner" id="hero-content-inner">
          <div className="hero-content-copys">
            <h1 className="hero-title">
              David
              <br />
              Heckhoff
            </h1>
            {!isPreloaderVisible ? (
              <Banner className="hero-banner" copy={t("job-title")} animated />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
