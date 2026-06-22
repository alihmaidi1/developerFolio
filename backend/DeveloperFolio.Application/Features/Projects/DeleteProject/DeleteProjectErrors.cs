using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.DeleteProject;

internal static class DeleteProjectErrors
{
    public static readonly Error NotFound = new(
        "Project.NotFound",
        "The requested project was not found.");
}
