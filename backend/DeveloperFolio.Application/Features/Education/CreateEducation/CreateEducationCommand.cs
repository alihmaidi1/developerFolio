using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.CreateEducation;

internal sealed record CreateEducationCommand(
    string SchoolName,
    string Degree,
    string Duration,
    string? Description,
    string? LogoUrl,
    IReadOnlyCollection<string>? DescriptionBullets,
    bool IsPublished) : ICommand<TResult<Guid>>;
