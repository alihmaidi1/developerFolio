namespace DeveloperFolio.Application.Features.WorkExperience.CreateWorkExperience;

public sealed record CreateWorkExperienceRequest(
    string Role,
    string Company,
    string Date,
    string? Description,
    string? CompanyLogoUrl,
    IReadOnlyCollection<string>? DescriptionBullets,
    bool IsPublished);
