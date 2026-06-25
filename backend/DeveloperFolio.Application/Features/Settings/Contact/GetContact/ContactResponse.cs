using DeveloperFolio.Domain.Settings;

namespace DeveloperFolio.Application.Features.Settings.Contact.GetContact;

public sealed record ContactResponse(
    string Title,
    string Subtitle,
    string? Email,
    string? Phone,
    string? Address)
{
    internal static ContactResponse From(ContactSettings contact) =>
        new(
            contact.Title,
            contact.Subtitle,
            contact.Email,
            contact.Phone,
            contact.Address);
}
