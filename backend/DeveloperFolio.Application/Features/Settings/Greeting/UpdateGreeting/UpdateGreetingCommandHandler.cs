using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.Greeting.UpdateGreeting;

internal sealed class UpdateGreetingCommandHandler(
    IApplicationDbContext dbContext,
    IVideoStorageService videoStorage)
    : IRequestHandler<UpdateGreetingCommand, Result>
{
    public async Task<Result> Handle(UpdateGreetingCommand request, CancellationToken cancellationToken)
    {
        var greeting = await dbContext.GreetingSettings
            .SingleOrDefaultAsync(cancellationToken);

        if (greeting is null)
        {
            return Result.NotFound(GreetingErrors.NotInitialized);
        }

        var previousVideoUrl = greeting.IntroVideoUrl;

        greeting.Update(
            request.Username,
            request.Title,
            request.SubTitle,
            request.ResumeUrl,
            request.IntroVideoUrl,
            request.DisplayGreeting);

        if (!string.Equals(previousVideoUrl, greeting.IntroVideoUrl, StringComparison.Ordinal))
        {
            await videoStorage.RemoveAsync(previousVideoUrl, cancellationToken);
        }

        return Result.NoContent();
    }
}
