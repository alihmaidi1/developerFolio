using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.UpdateProject;

internal sealed record UpdateProjectCommand(
    Guid Id,
    string Title,
    string Summary,
    string? Description,
    string? ImageUrl,
    string? RepositoryUrl,
    string? LiveUrl,
    IReadOnlyCollection<string>? Technologies,
    bool IsPublished) : ICommand<Result>;
