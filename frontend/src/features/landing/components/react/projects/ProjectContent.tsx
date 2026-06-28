import { useEffect, useMemo, useState } from "react";
import { previews } from "../../../content/projects/previews";
import { useI18n } from "../../../hooks/useI18n";
import { Layout } from "../Layout";
import { Link } from "../Link";
import { ProjectHero } from "./ProjectHero";
import { ProjectComponent } from "./ProjectComponent";
import { NextProject } from "./NextProject";
import type {
  ProjectContent as ProjectContentType,
  ProjectPreview,
} from "../../../content/types";

export function ProjectContent({
  content,
  projectId,
  onNavigate,
}: {
  content: ProjectContentType;
  projectId: string;
  onNavigate: (slug: string) => void;
}) {
  const { locale } = useI18n();
  const [loadedPreviews, setLoadedPreviews] = useState<ProjectPreview[] | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    previews[locale]().then((module) => {
      if (!cancelled) setLoadedPreviews(module.default);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const nextProject = useMemo(() => {
    if (!loadedPreviews) return null;
    const currentIndex = loadedPreviews.findIndex(
      (project) => project.slug === projectId,
    );
    if (currentIndex === -1) return null;
    return loadedPreviews[(currentIndex + 1) % loadedPreviews.length];
  }, [loadedPreviews, projectId]);

  return (
    <Layout className="project-content">
      <ProjectHero content={content} projectId={projectId} />
      <div className="project-content-components">
        {content.components?.map((component, index) => (
          <div
            className="grid project-content-grid"
            key={`${component.type}-${index}`}
          >
            <ProjectComponent component={component} index={index} />
          </div>
        ))}
      </div>
      <div className="grid project-content-next-project-grid">
        {nextProject ? (
          <Link
            to={`/project/${nextProject.slug}`}
            replace
            className="project-content-next-project"
            data-cursor="arrow"
            data-sound="click"
            onClick={(event) => {
              event.preventDefault();
              onNavigate(nextProject.slug);
            }}
          >
            <NextProject project={nextProject} />
          </Link>
        ) : null}
      </div>
    </Layout>
  );
}
