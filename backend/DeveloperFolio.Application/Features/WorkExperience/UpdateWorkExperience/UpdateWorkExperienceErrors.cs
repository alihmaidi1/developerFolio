using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.UpdateWorkExperience;

internal static class UpdateWorkExperienceErrors
{
    public static readonly Error NotFound = new(
        "WorkExperience.NotFound",
        "The requested work experience entry was not found.");
}
