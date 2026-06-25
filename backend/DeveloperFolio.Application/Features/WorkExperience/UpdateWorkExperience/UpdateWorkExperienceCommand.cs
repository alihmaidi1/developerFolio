using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.UpdateWorkExperience;

internal sealed record UpdateWorkExperienceCommand(
    Guid Id,
    string Role,
    string Company,
    string Date,
    string? Description,
    string? CompanyLogoUrl,
    IReadOnlyCollection<string>? DescriptionBullets,
    bool IsPublished) : ICommand<Result>;
