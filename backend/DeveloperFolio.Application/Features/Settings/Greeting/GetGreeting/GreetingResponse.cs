using DeveloperFolio.Domain.Settings;

namespace DeveloperFolio.Application.Features.Settings.Greeting.GetGreeting;

public sealed record GreetingResponse(
    string Username,
    string Title,
    string SubTitle,
    string? ResumeUrl,
    bool DisplayGreeting)
{
    internal static GreetingResponse From(GreetingSettings greeting) =>
        new(
            greeting.Username,
            greeting.Title,
            greeting.SubTitle,
            greeting.ResumeUrl,
            greeting.DisplayGreeting);
}
