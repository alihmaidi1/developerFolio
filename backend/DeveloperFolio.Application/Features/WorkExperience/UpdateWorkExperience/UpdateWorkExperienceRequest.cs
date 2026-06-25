namespace DeveloperFolio.Application.Features.WorkExperience.UpdateWorkExperience;

public sealed record UpdateWorkExperienceRequest(
    string Role,
    string Company,
    string Date,
    string? Description,
    string? CompanyLogoUrl,
    IReadOnlyCollection<string>? DescriptionBullets,
    bool IsPublished);
