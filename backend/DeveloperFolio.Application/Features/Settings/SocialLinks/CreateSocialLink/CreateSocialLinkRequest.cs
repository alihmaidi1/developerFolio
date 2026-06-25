namespace DeveloperFolio.Application.Features.Settings.SocialLinks.CreateSocialLink;

public sealed record CreateSocialLinkRequest(
    string Name,
    string Url,
    string IconClassName,
    bool IsPublished);
