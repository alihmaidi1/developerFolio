using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Education.UpdateEducation;

internal sealed record UpdateEducationCommand(
    Guid Id,
    string SchoolName,
    string Degree,
    string Duration,
    string? Description,
    string? LogoUrl,
    IReadOnlyCollection<string>? DescriptionBullets,
    bool IsPublished) : ICommand<Result>;
