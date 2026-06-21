using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Projects;

public sealed class PortfolioProject : Entity
{
    private readonly List<ProjectTechnology> _technologies = [];

    private PortfolioProject()
    {
    }

    public string Title { get; private set; } = string.Empty;
    public string Summary { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public string? ImageUrl { get; private set; }
    public string? RepositoryUrl { get; private set; }
    public string? LiveUrl { get; private set; }
    public int SortOrder { get; private set; }
    public bool IsPublished { get; private set; }
    public IReadOnlyCollection<ProjectTechnology> Technologies => _technologies;

    public static PortfolioProject Create(
        string title,
        string summary,
        string? description,
        string? imageUrl,
        string? repositoryUrl,
        string? liveUrl,
        IEnumerable<string> technologies,
        int sortOrder,
        bool isPublished)
    {
        var project = new PortfolioProject();
        project.Update(title, summary, description, imageUrl, repositoryUrl, liveUrl, technologies, sortOrder, isPublished);
        return project;
    }

    public void Update(
        string title,
        string summary,
        string? description,
        string? imageUrl,
        string? repositoryUrl,
        string? liveUrl,
        IEnumerable<string> technologies,
        int sortOrder,
        bool isPublished)
    {
        Title = title.Trim();
        Summary = summary.Trim();
        Description = Normalize(description);
        ImageUrl = Normalize(imageUrl);
        RepositoryUrl = Normalize(repositoryUrl);
        LiveUrl = Normalize(liveUrl);
        SortOrder = sortOrder;
        IsPublished = isPublished;

        _technologies.Clear();
        _technologies.AddRange(
            technologies
                .Select(value => value.Trim())
                .Where(value => value.Length > 0)
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .Select((value, index) => ProjectTechnology.Create(Id, value, index)));

        Touch();
    }

    private static string? Normalize(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}

public sealed class ProjectTechnology
{
    private ProjectTechnology()
    {
    }

    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid ProjectId { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }

    internal static ProjectTechnology Create(Guid projectId, string name, int sortOrder) =>
        new()
        {
            ProjectId = projectId,
            Name = name,
            SortOrder = sortOrder,
        };
}
