namespace DeveloperFolio.Application.Features.Settings.GetPortfolioSettings;

public sealed record PortfolioGreeting(
    string Username,
    string Title,
    string SubTitle,
    string? ResumeUrl,
    bool DisplayGreeting);

public sealed record PortfolioContact(
    string Title,
    string Subtitle,
    string? Email,
    string? Phone,
    string? Address);

public sealed record PortfolioSocialLink(
    Guid Id,
    string Name,
    string Url,
    string IconClassName);

public sealed record PortfolioSettingsResponse(
    PortfolioGreeting Greeting,
    PortfolioContact Contact,
    IReadOnlyCollection<PortfolioSocialLink> SocialLinks);
