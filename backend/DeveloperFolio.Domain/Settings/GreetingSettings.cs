using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Settings;

public sealed class GreetingSettings : Entity
{
    public static readonly Guid SingletonId = new("11111111-1111-1111-1111-111111111111");

    private GreetingSettings()
    {
    }

    private GreetingSettings(
        string username,
        string title,
        string subTitle,
        string? resumeUrl,
        string? introVideoUrl,
        bool displayGreeting)
    {
        Id = SingletonId;
        ApplyDetails(username, title, subTitle, resumeUrl, introVideoUrl, displayGreeting);
    }

    public string Username { get; private set; } = string.Empty;
    public string Title { get; private set; } = string.Empty;
    public string SubTitle { get; private set; } = string.Empty;
    public string? ResumeUrl { get; private set; }
    public string? IntroVideoUrl { get; private set; }
    public bool DisplayGreeting { get; private set; }

    public static GreetingSettings Create(
        string username,
        string title,
        string subTitle,
        string? resumeUrl,
        string? introVideoUrl,
        bool displayGreeting) =>
        new(username, title, subTitle, resumeUrl, introVideoUrl, displayGreeting);

    public void Update(
        string username,
        string title,
        string subTitle,
        string? resumeUrl,
        string? introVideoUrl,
        bool displayGreeting)
    {
        ApplyDetails(username, title, subTitle, resumeUrl, introVideoUrl, displayGreeting);
        Touch();
    }

    private void ApplyDetails(
        string username,
        string title,
        string subTitle,
        string? resumeUrl,
        string? introVideoUrl,
        bool displayGreeting)
    {
        Username = username.Trim();
        Title = title.Trim();
        SubTitle = subTitle.Trim();
        ResumeUrl = NormalizeOptional(resumeUrl);
        IntroVideoUrl = NormalizeOptional(introVideoUrl);
        DisplayGreeting = displayGreeting;
    }

    private static string? NormalizeOptional(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
