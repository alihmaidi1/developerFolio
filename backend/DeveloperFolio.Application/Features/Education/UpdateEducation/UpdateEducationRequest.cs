namespace DeveloperFolio.Application.Features.Education.UpdateEducation;

public sealed record UpdateEducationRequest(
    string SchoolName,
    string Degree,
    string Duration,
    string? Description,
    string? LogoUrl,
    IReadOnlyCollection<string>? DescriptionBullets,
    bool IsPublished);
