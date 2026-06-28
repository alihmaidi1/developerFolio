import type { ProjectPreview } from "../../../content/types";

export function NextProject({ project }: { project: ProjectPreview }) {
  return (
    <div className="next-project">
      <img src={project.thumbnail} alt="" className="next-project-image" />
      <div className="next-project-content">
        <p className="next-project-label">Next Project</p>
        <h3 className="next-project-title">{project.title}</h3>
      </div>
    </div>
  );
}
