using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.UpdateProject;

internal static class UpdateProjectErrors
{
    public static readonly Error NotFound = new(
        "Project.NotFound",
        "The requested project was not found.");
}
