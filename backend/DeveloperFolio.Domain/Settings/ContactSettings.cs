using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Settings;

public sealed class ContactSettings : Entity
{
    public static readonly Guid SingletonId = new("22222222-2222-2222-2222-222222222222");

    private ContactSettings()
    {
    }

    private ContactSettings(
        string title,
        string subtitle,
        string? email,
        string? phone,
        string? address)
    {
        Id = SingletonId;
        ApplyDetails(title, subtitle, email, phone, address);
    }

    public string Title { get; private set; } = string.Empty;
    public string Subtitle { get; private set; } = string.Empty;
    public string? Email { get; private set; }
    public string? Phone { get; private set; }
    public string? Address { get; private set; }

    public static ContactSettings Create(
        string title,
        string subtitle,
        string? email,
        string? phone,
        string? address) =>
        new(title, subtitle, email, phone, address);

    public void Update(
        string title,
        string subtitle,
        string? email,
        string? phone,
        string? address)
    {
        ApplyDetails(title, subtitle, email, phone, address);
        Touch();
    }

    private void ApplyDetails(
        string title,
        string subtitle,
        string? email,
        string? phone,
        string? address)
    {
        Title = title.Trim();
        Subtitle = subtitle.Trim();
        Email = NormalizeOptional(email);
        Phone = NormalizeOptional(phone);
        Address = NormalizeOptional(address);
    }

    private static string? NormalizeOptional(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
