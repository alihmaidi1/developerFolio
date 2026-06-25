using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.GetWorkExperience;

internal static class GetWorkExperienceErrors
{
    public static readonly Error NotFound = new(
        "WorkExperience.NotFound",
        "The requested work experience entry was not found.");
}
