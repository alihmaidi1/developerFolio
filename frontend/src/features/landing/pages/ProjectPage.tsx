import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { lenis } from "../hooks/useScroll";
import { Footer } from "../components/react/Footer";
import { ProjectContent } from "../components/react/projects/ProjectContent";
import { projectModules } from "../content/projects";
import { locale } from "../i18n/store";
import { useSignal } from "../hooks/useSignal";
import { projectIdSignal, recentProjectIdSignal } from "../store/routeStore";
import type { ProjectContent as ProjectContentType } from "../content/types";
import type { Locale } from "../i18n/types";

export function ProjectPage({
  visible,
  transitioning,
}: {
  visible: boolean;
  transitioning: boolean;
}) {
  const projectId = useSignal(projectIdSignal);
  const recentProjectId = useSignal(recentProjectIdSignal);
  const activeLocale = useSignal(locale);
  const navigate = useNavigate();

  const content = useMemo(() => {
    if (!recentProjectId || !activeLocale) return null;
    const projectModule = projectModules[activeLocale as Locale]?.[
      recentProjectId
    ] as { default?: ProjectContentType } | undefined;
    return projectModule?.default ?? null;
  }, [activeLocale, recentProjectId]);

  useEffect(() => {
    if (!projectId || transitioning) return;
    lenis.value?.scrollTo(0, { immediate: true });
  }, [projectId, transitioning]);

  if (!recentProjectId) return null;

  return (
    <div
      className={[
        "project-wrapper",
        visible ? "project-wrapper-visible" : "",
        transitioning ? "project-wrapper-transitioning" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="project-content">
        <div
          className={[
            "project",
            `project-${recentProjectId}`,
            transitioning ? "project-transitioning" : "",
            visible ? "project-visible" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className={[
              "project-content-wrapper",
              visible ? "project-content-wrapper-visible" : "",
            ].join(" ")}
          >
            {content && visible ? (
              <ProjectContent
                content={content}
                projectId={recentProjectId}
                onNavigate={(slug) =>
                  navigate(`/project/${slug}`, { replace: true })
                }
              />
            ) : null}
            <Footer
              className={["project-footer", `project-${recentProjectId}`].join(
                " ",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
