using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.UpdateEducation;

internal static class UpdateEducationErrors
{
    public static readonly Error NotFound = new(
        "Education.NotFound",
        "The requested education entry was not found.");
}
