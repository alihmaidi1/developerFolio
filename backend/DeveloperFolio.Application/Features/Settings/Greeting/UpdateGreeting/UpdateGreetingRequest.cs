namespace DeveloperFolio.Application.Features.Settings.Greeting.UpdateGreeting;

public sealed record UpdateGreetingRequest(
    string Username,
    string Title,
    string SubTitle,
    string? ResumeUrl,
    bool DisplayGreeting);
