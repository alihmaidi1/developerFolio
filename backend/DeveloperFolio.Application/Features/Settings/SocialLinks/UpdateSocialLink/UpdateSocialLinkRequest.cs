namespace DeveloperFolio.Application.Features.Settings.SocialLinks.UpdateSocialLink;

public sealed record UpdateSocialLinkRequest(
    string Name,
    string Url,
    string IconClassName,
    bool IsPublished);
