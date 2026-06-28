import { useEffect } from "react";
import { isFeatureEnabled } from "../../../utils/features";
import { useI18n } from "../../../hooks/useI18n";
import { usePortfolioData } from "../../../hooks/usePortfolioData";
import { resolveAssetUrl } from "@/shared/lib/asset-url";
import type { PublishedProject } from "../../../api/landing.types";
import { Banner } from "../Banner";
import { NotchSection, Notch } from "../Notch";
import { Link } from "../Link";
import { ButtonRound } from "../Button";
import { ArrowRightLong, Plus } from "../icons";

export function Projects({
  id,
  onLoaded,
}: {
  id?: string;
  onLoaded: () => void;
}) {
  const { t } = useI18n();
  const { projects, settings } = usePortfolioData();

  useEffect(() => {
    if (projects) {
      onLoaded();
    }
  }, [projects, onLoaded]);

  const contactEmail = settings?.contact.email;
  const contactHref = contactEmail ? `mailto:${contactEmail}` : undefined;

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
          {projects?.map((project) => (
            <PreviewCard key={project.id} project={project} />
          ))}
          {isFeatureEnabled("startProject") && contactHref ? (
            <StartProjectCard href={contactHref} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StartProjectCard({ href }: { href: string }) {
  const { t } = useI18n();

  return (
    <Link
      className="preview-card children-unclickable"
      data-cursor="arrow-external"
      data-hoversound="hover"
      external
      href={href}
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

function PreviewCard({ project }: { project: PublishedProject }) {
  const { t } = useI18n();
  const projectUrl = project.liveUrl ?? project.repositoryUrl;
  const thumbnail = resolveAssetUrl(project.imageUrl);

  if (!projectUrl) return null;

  return (
    <Link
      className="preview-card children-unclickable"
      href={projectUrl}
      external
      aria-label={t("switch-to-project", { project: project.title })}
      data-cursor="arrow-external"
      data-sound="click"
      data-hoversound="hover"
    >
      <div className="preview-card-top">
        <div className="preview-card-image-wrapper">
          <div className="preview-card-image-container">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={project.title}
                className="preview-card-image"
              />
            ) : null}
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
          <h3 className="preview-card-title">{project.title}</h3>
          <p className="preview-card-description">{project.summary}</p>
        </div>
      </div>
    </Link>
  );
}
