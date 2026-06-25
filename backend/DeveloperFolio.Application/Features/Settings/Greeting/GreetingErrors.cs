using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.Greeting;

internal static class GreetingErrors
{
    public static readonly Error NotInitialized = new(
        "Settings.Greeting.NotInitialized",
        "Greeting settings have not been initialized. Restart the application to run the seeder.");
}
