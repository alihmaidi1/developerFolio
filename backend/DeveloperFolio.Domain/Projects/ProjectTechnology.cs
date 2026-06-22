using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Projects;

public sealed class ProjectTechnology : Entity
{
    private ProjectTechnology()
    {
    }

    private ProjectTechnology(Guid projectId, string name)
    {
        ProjectId = projectId;
        Name = name;
    }

    public Guid ProjectId { get; private set; }
    public string Name { get; private set; } = string.Empty;

    internal static ProjectTechnology Create(Guid projectId, string name) => new(projectId, name);
}
