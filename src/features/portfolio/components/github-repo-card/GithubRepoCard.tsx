import { BookOpen, GitFork, Star } from "lucide-react";
import type { GithubRepositoryEdge } from "@/features/portfolio/model/portfolio.schemas";
import { cn } from "@/shared/lib/cn";
import { Fade } from "@/shared/ui/reveal/Reveal";
import { formatFileSizeDisplay } from "@/shared/lib/format-file-size";
import "./GithubRepoCard.scss";

interface GithubRepoCardProps {
  repo: GithubRepositoryEdge;
  isDark: boolean;
}

export default function GithubRepoCard({ repo, isDark }: GithubRepoCardProps) {
  return (
    <Fade bottom duration={1000} distance="20px">
      <a
        className={cn("repo-card-div", isDark && "dark-card-mode")}
        href={repo.node.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="repo-name-div">
          <BookOpen aria-hidden className="repo-svg" size={20} />
          <p className="repo-name">{repo.node.name}</p>
        </div>
        <p className="repo-description">{repo.node.description}</p>
        <div className="repo-stats">
          <div className="repo-left-stat">
            {repo.node.primaryLanguage && (
              <span>
                <span
                  className="language-color"
                  style={{ backgroundColor: repo.node.primaryLanguage.color }}
                />
                <p>{repo.node.primaryLanguage.name}</p>
              </span>
            )}
            <span>
              <GitFork aria-hidden className="repo-star-svg" size={16} />
              <p>{repo.node.forkCount}</p>
            </span>
            <span>
              <Star aria-hidden className="repo-star-svg" size={16} />
              <p>{repo.node.stargazers.totalCount}</p>
            </span>
          </div>
          <div className="repo-right-stat">
            <p>{formatFileSizeDisplay(repo.node.diskUsage)}</p>
          </div>
        </div>
      </a>
    </Fade>
  );
}
