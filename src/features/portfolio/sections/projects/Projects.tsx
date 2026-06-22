import { lazy, Suspense } from "react";
import { useGithubRepositories } from "@/features/portfolio/hooks/useGithubRepositories";
import { Button, ErrorState } from "@/shared/ui";
import {
  openSource,
  socialMediaLinks,
} from "@/features/portfolio/config/portfolio.config";
import { useTheme } from "@/shared/theme/ThemeContext";
import Loading from "@/shared/ui/loading/Loading";
import "./Projects.scss";

const GithubRepoCard = lazy(
  () =>
    import("@/features/portfolio/components/github-repo-card/GithubRepoCard"),
);

export default function Projects() {
  const {
    data: repositories = [],
    isError,
    isPending,
    refetch,
  } = useGithubRepositories(openSource.display);
  const { isDark } = useTheme();

  if (!openSource.display) {
    return null;
  }

  if (isError) {
    return (
      <div className="main" id="opensource">
        <ErrorState
          title="Projects are temporarily unavailable."
          description="The portfolio data could not be loaded. Retry the request without reloading the entire page."
          actionLabel="Retry projects"
          onAction={() => void refetch()}
          compact
        />
      </div>
    );
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="main" id="opensource">
        <h1 className="project-title">Open Source Projects</h1>
        <div className="repo-cards-div-main">
          {repositories.map((repository) => (
            <GithubRepoCard
              repo={repository}
              key={repository.node.id}
              isDark={isDark}
            />
          ))}
        </div>
        <Button
          text="More Projects"
          className="project-button"
          href={socialMediaLinks.github}
          newTab
        />
      </div>
    </Suspense>
  );
}
