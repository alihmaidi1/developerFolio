namespace DeveloperFolio.Application.Features.Settings.Contact.UpdateContact;

public sealed record UpdateContactRequest(
    string Title,
    string Subtitle,
    string? Email,
    string? Phone,
    string? Address);
