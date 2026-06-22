namespace DeveloperFolio.Application.Features.Projects.CreateProject;

public sealed record CreateProjectRequest(
    string Title,
    string Summary,
    string? Description,
    string? ImageUrl,
    string? RepositoryUrl,
    string? LiveUrl,
    IReadOnlyCollection<string>? Technologies,
    int SortOrder,
    bool IsPublished);
