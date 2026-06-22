using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.GetProject;

internal static class GetProjectErrors
{
    public static readonly Error NotFound = new(
        "Project.NotFound",
        "The requested project was not found.");
}
