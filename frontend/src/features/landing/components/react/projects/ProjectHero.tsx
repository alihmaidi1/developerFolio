import { useI18n } from "../../../hooks/useI18n";
import { Link } from "../Link";
import { Tag } from "../Tag";
import type { ProjectContent } from "../../../content/types";

export function ProjectHero({
  content,
  projectId,
}: {
  content: ProjectContent;
  projectId: string;
}) {
  const { t } = useI18n();

  return (
    <div className="project-hero grid" key={projectId}>
      <div className="project-hero-content">
        <div className="project-hero-tags">
          {content.tags.map((tag) => (
            <Tag key={tag} variant={tag} />
          ))}
        </div>
        <h1 className="project-hero-title">{content.title}</h1>
        {content.description ? (
          <p
            className="project-hero-description"
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
        ) : null}
        <div className="project-hero-buttons">
          {content.live ? (
            <Link
              href={content.live}
              external
              className="project-hero-button"
              data-cursor="arrow-external"
            >
              {t("live-view")}
            </Link>
          ) : null}
          {content.source ? (
            <Link
              href={content.source}
              external
              className="project-hero-button"
              data-cursor="arrow-external"
            >
              {t("source-code")}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
