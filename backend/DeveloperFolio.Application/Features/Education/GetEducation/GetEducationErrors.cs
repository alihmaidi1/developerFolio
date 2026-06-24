using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.GetEducation;

internal static class GetEducationErrors
{
    public static readonly Error NotFound = new(
        "Education.NotFound",
        "The requested education entry was not found.");
}
