using DeveloperFolio.Domain.Projects;

namespace DeveloperFolio.Application.Features.Projects.ListPublishedProjects;

public sealed record PublishedProjectResponse(
    Guid Id,
    string Title,
    string Summary,
    string? Description,
    string? ImageUrl,
    string? RepositoryUrl,
    string? LiveUrl,
    IReadOnlyCollection<string> Technologies)
{
    internal static PublishedProjectResponse From(PortfolioProject project) =>
        new(
            project.Id,
            project.Title,
            project.Summary,
            project.Description,
            project.ImageUrl,
            project.RepositoryUrl,
            project.LiveUrl,
            project.Technologies.Select(technology => technology.Name).ToArray());
}
