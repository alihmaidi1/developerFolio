using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.DeleteWorkExperience;

internal static class DeleteWorkExperienceErrors
{
    public static readonly Error NotFound = new(
        "WorkExperience.NotFound",
        "The requested work experience entry was not found.");
}
