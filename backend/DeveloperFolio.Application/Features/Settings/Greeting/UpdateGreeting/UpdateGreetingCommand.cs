using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.Greeting.UpdateGreeting;

internal sealed record UpdateGreetingCommand(
    string Username,
    string Title,
    string SubTitle,
    string? ResumeUrl,
    string? IntroVideoUrl,
    bool DisplayGreeting) : ICommand<Result>;
