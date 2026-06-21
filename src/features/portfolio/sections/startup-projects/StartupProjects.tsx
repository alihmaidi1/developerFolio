import { cn } from "@/shared/lib/cn";
import { Fade } from "@/shared/ui/reveal/Reveal";
import { bigProjects } from "@/features/portfolio/config/portfolio.config";
import { useTheme } from "@/shared/theme/ThemeContext";
import "./StartupProjects.scss";

export default function StartupProject() {
  const { isDark } = useTheme();

  if (!bigProjects.display) {
    return null;
  }

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <h1 className="skills-heading">{bigProjects.title}</h1>
        <p
          className={cn("project-subtitle", isDark ? "dark-mode" : "subTitle")}
        >
          {bigProjects.subtitle}
        </p>

        <div className="projects-container">
          {bigProjects.projects.map((project) => (
            <article
              key={project.projectName}
              className={cn(
                "project-card",
                isDark ? "dark-mode project-card-dark" : "project-card-light",
              )}
            >
              {project.image && (
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.projectName}
                    className="card-image"
                  />
                </div>
              )}
              <div className="project-detail">
                <h5 className={cn("card-title", isDark && "dark-mode")}>
                  {project.projectName}
                </h5>
                <p className={cn("card-subtitle", isDark && "dark-mode")}>
                  {project.projectDesc}
                </p>
                <div className="project-card-footer">
                  {project.footerLink.map((link) => (
                    <a
                      key={`${link.name}-${link.url}`}
                      className={cn("project-tag", isDark && "dark-mode")}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Fade>
  );
}
