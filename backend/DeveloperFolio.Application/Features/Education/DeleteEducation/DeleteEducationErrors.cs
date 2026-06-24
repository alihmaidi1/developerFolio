using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.DeleteEducation;

internal static class DeleteEducationErrors
{
    public static readonly Error NotFound = new(
        "Education.NotFound",
        "The requested education entry was not found.");
}
