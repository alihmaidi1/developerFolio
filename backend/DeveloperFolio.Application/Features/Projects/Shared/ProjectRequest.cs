namespace DeveloperFolio.Application.Features.Projects.Shared;

public sealed record ProjectRequest(
    string Title,
    string Summary,
    string? Description,
    string? ImageUrl,
    string? RepositoryUrl,
    string? LiveUrl,
    IReadOnlyCollection<string> Technologies,
    int SortOrder,
    bool IsPublished);
