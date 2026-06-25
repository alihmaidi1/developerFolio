using DeveloperFolio.Domain.WorkExperience;

namespace DeveloperFolio.Application.Features.WorkExperience.ListPublishedWorkExperiences;

public sealed record PublishedWorkExperienceResponse(
    Guid Id,
    string Role,
    string Company,
    string Date,
    string? Description,
    string? CompanyLogoUrl,
    IReadOnlyCollection<string> DescriptionBullets)
{
    internal static PublishedWorkExperienceResponse From(WorkExperienceEntry entry) =>
        new(
            entry.Id,
            entry.Role,
            entry.Company,
            entry.Date,
            entry.Description,
            entry.CompanyLogoUrl,
            entry.DescriptionBullets
                .OrderBy(bullet => bullet.SortOrder)
                .Select(bullet => bullet.Text)
                .ToArray());
}
