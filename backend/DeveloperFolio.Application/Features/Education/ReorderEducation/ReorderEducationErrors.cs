using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.ReorderEducation;

internal static class ReorderEducationErrors
{
    public static readonly Error NotFound = new(
        "Education.NotFound",
        "The requested education entry was not found.");
}
