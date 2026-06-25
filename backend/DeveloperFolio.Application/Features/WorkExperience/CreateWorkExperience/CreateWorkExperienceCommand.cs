using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.CreateWorkExperience;

internal sealed record CreateWorkExperienceCommand(
    string Role,
    string Company,
    string Date,
    string? Description,
    string? CompanyLogoUrl,
    IReadOnlyCollection<string>? DescriptionBullets,
    bool IsPublished) : ICommand<TResult<Guid>>;
