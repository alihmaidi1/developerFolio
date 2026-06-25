using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.Contact;

internal static class ContactErrors
{
    public static readonly Error NotInitialized = new(
        "Settings.Contact.NotInitialized",
        "Contact settings have not been initialized. Restart the application to run the seeder.");
}
