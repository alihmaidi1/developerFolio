using DeveloperFolio.Domain.Education;

namespace DeveloperFolio.Application.Features.Education.GetEducation;

public sealed record EducationResponse(
    Guid Id,
    string SchoolName,
    string Degree,
    string Duration,
    string? Description,
    string? LogoUrl,
    IReadOnlyCollection<string> DescriptionBullets,
    int SortOrder,
    bool IsPublished,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset UpdatedAtUtc)
{
    internal static EducationResponse From(EducationEntry entry) =>
        new(
            entry.Id,
            entry.SchoolName,
            entry.Degree,
            entry.Duration,
            entry.Description,
            entry.LogoUrl,
            entry.DescriptionBullets
                .OrderBy(bullet => bullet.SortOrder)
                .Select(bullet => bullet.Text)
                .ToArray(),
            entry.SortOrder,
            entry.IsPublished,
            entry.CreatedAtUtc,
            entry.UpdatedAtUtc);
}
