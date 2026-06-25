using DeveloperFolio.Domain.Settings;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.GetSocialLink;

public sealed record SocialLinkResponse(
    Guid Id,
    string Name,
    string Url,
    string IconClassName,
    int SortOrder,
    bool IsPublished,
    DateTimeOffset CreatedAtUtc,
    DateTimeOffset UpdatedAtUtc)
{
    internal static SocialLinkResponse From(SocialLink link) =>
        new(
            link.Id,
            link.Name,
            link.Url,
            link.IconClassName,
            link.SortOrder,
            link.IsPublished,
            link.CreatedAtUtc,
            link.UpdatedAtUtc);
}
