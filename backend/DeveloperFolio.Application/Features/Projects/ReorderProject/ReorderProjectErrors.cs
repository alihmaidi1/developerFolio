using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Projects.ReorderProject;

internal static class ReorderProjectErrors
{
    public static readonly Error NotFound = new(
        "Project.NotFound",
        "The requested project was not found.");
}
