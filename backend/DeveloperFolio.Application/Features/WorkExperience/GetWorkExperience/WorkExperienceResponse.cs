using DeveloperFolio.Domain.WorkExperience;

namespace DeveloperFolio.Application.Features.WorkExperience.GetWorkExperience;

public sealed record WorkExperienceResponse(
    Guid Id,
    string Role,
    string Company,
    string Date,
    string? Description,
    string? CompanyLogoUrl,
    IReadOnlyCollection<string> DescriptionBullets,
    int SortOrder,
    bool IsPublished,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset UpdatedAtUtc)
{
    internal static WorkExperienceResponse From(WorkExperienceEntry entry) =>
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
                .ToArray(),
            entry.SortOrder,
            entry.IsPublished,
            entry.CreatedAtUtc,
            entry.UpdatedAtUtc);
}
