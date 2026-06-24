namespace DeveloperFolio.Application.Features.Education.CreateEducation;

public sealed record CreateEducationRequest(
    string SchoolName,
    string Degree,
    string Duration,
    string? Description,
    string? LogoUrl,
    IReadOnlyCollection<string>? DescriptionBullets,
    bool IsPublished);
