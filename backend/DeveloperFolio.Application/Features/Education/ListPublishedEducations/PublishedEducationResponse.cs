using DeveloperFolio.Domain.Education;

namespace DeveloperFolio.Application.Features.Education.ListPublishedEducations;

public sealed record PublishedEducationResponse(
    Guid Id,
    string SchoolName,
    string Degree,
    string Duration,
    string? Description,
    string? LogoUrl,
    IReadOnlyCollection<string> DescriptionBullets)
{
    internal static PublishedEducationResponse From(EducationEntry entry) =>
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
                .ToArray());
}
