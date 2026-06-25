using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.ReorderWorkExperience;

internal static class ReorderWorkExperienceErrors
{
    public static readonly Error NotFound = new(
        "WorkExperience.NotFound",
        "The requested work experience entry was not found.");
}
