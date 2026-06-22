using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Projects;

public sealed class PortfolioProject : Entity
{
    private readonly List<ProjectTechnology> _technologies = [];

    private PortfolioProject()
    {
    }

    private PortfolioProject(string title,string summary,string? description,string? imageUrl,string? repositoryUrl,string? liveUrl,IEnumerable<string> technologies,int sortOrder,bool isPublished)
    {
        ApplyDetails(
            title,
            summary,
            description,
            imageUrl,
            repositoryUrl,
            liveUrl,
            technologies,
            sortOrder,
            isPublished);
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
        bool isPublished) =>
        new(
            title,
            summary,
            description,
            imageUrl,
            repositoryUrl,
            liveUrl,
            technologies,
            sortOrder,
            isPublished);

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
        ApplyDetails(
            title,
            summary,
            description,
            imageUrl,
            repositoryUrl,
            liveUrl,
            technologies,
            sortOrder,
            isPublished);

        Touch();
    }

    public void SetSortOrder(int sortOrder)
    {
        SortOrder = sortOrder;
        Touch();
    }

    private void ApplyDetails(
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
        Description = NormalizeOptional(description);
        ImageUrl = NormalizeOptional(imageUrl);
        RepositoryUrl = NormalizeOptional(repositoryUrl);
        LiveUrl = NormalizeOptional(liveUrl);
        SortOrder = sortOrder;
        IsPublished = isPublished;

        _technologies.Clear();
        _technologies.AddRange(
            technologies
                .Select(technology => technology.Trim())
                .Where(technology => technology.Length > 0)
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .Select(technology => ProjectTechnology.Create(Id, technology)));
    }

    private static string? NormalizeOptional(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
