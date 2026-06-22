using DeveloperFolio.Domain.Projects;

namespace DeveloperFolio.Application.Features.Projects.ListProjects;

public sealed record ListProjectResponse(
    Guid Id,
    string Title,
    string Summary,
    string? Description,
    string? ImageUrl,
    string? RepositoryUrl,
    string? LiveUrl,
    IReadOnlyCollection<string> Technologies,
    int SortOrder,
    bool IsPublished,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset UpdatedAtUtc)
{
    internal static ListProjectResponse From(PortfolioProject project) =>
        new(
            project.Id,
            project.Title,
            project.Summary,
            project.Description,
            project.ImageUrl,
            project.RepositoryUrl,
            project.LiveUrl,
            project.Technologies.Select(technology => technology.Name).ToArray(),
            project.SortOrder,
            project.IsPublished,
            project.CreatedAtUtc,
            project.UpdatedAtUtc);
}
