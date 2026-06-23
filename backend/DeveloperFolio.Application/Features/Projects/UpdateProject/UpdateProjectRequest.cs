namespace DeveloperFolio.Application.Features.Projects.UpdateProject;

public sealed record UpdateProjectRequest(
    string Title,
    string Summary,
    string? Description,
    string? ImageUrl,
    string? RepositoryUrl,
    string? LiveUrl,
    IReadOnlyCollection<string>? Technologies,
    bool IsPublished);
