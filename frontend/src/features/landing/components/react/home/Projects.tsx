import { useEffect, useState } from "react";
import { isFeatureEnabled } from "../../../utils/features";
import { previews } from "../../../content/projects/previews";
import { useI18n } from "../../../hooks/useI18n";
import type { ProjectPreview } from "../../../content/types";
import { Banner } from "../Banner";
import { NotchSection, Notch } from "../Notch";
import { Link } from "../Link";
import { ButtonRound } from "../Button";
import { ArrowRightLong, Plus } from "../icons";
import { social } from "../../../content/social";

export function Projects({
  id,
  onLoaded,
}: {
  id?: string;
  onLoaded: (previews: ProjectPreview[]) => void;
}) {
  const { t, locale } = useI18n();
  const [loadedPreviews, setLoadedPreviews] = useState<ProjectPreview[] | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    previews[locale]().then((module) => {
      if (cancelled) return;
      setLoadedPreviews(module.default);
      onLoaded(module.default);
    });
    return () => {
      cancelled = true;
    };
  }, [locale, onLoaded]);

  return (
    <div className="projects" id={id}>
      <NotchSection className="projects-notch-start" />
      <NotchSection className="projects-notch-end" />
      <div className="grid">
        <div className="projects-title">
          <Banner
            className="projects-title-banner"
            copy={t("selected")}
            size="sm"
            animated
          />
          <h2 className="projects-title-copy">{t("projects")}</h2>
        </div>
      </div>
      <div className="grid">
        <div className="projects-cards">
          {loadedPreviews?.map((preview) => (
            <PreviewCard key={preview.title} preview={preview} />
          ))}
          {isFeatureEnabled("startProject") ? <PreviewCard /> : null}
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ preview }: { preview?: ProjectPreview }) {
  const { t } = useI18n();

  if (!preview) {
    return (
      <Link
        className="preview-card children-unclickable"
        data-cursor="arrow-external"
        data-hoversound="hover"
        external
        href={social[0].url}
      >
        <div className="preview-card-top preview-card-top-empty">
          <Plus className="preview-card-top-empty-icon" />
        </div>
        <div className="preview-card-content">
          <div className="preview-card-copys">
            <h3 className="preview-card-title">{t("start-a-new-project")}</h3>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      className="preview-card children-unclickable"
      to={`/project/${preview.slug}`}
      aria-label={t("switch-to-project", { project: preview.title })}
      data-cursor="arrow"
      data-sound="click"
      data-hoversound="hover"
    >
      <div className="preview-card-top">
        <div className="preview-card-image-wrapper">
          <div className="preview-card-image-container">
            <img
              src={preview.thumbnail}
              alt={preview.title}
              className="preview-card-image"
            />
          </div>
        </div>
        <div className="preview-card-overlay">
          <div className="preview-card-edge">
            <ButtonRound
              className="preview-card-button"
              variant="accent"
              renderAs="div"
            >
              <ArrowRightLong className="preview-card-button-arrow" />
            </ButtonRound>
          </div>
          <Notch className="preview-card-notch preview-card-notch-left" />
          <Notch className="preview-card-notch preview-card-notch-right" />
        </div>
      </div>
      <div className="preview-card-content">
        <div className="preview-card-copys">
          <h3 className="preview-card-title">{preview.title}</h3>
          <p className="preview-card-description">{preview.description}</p>
        </div>
      </div>
    </Link>
  );
}
