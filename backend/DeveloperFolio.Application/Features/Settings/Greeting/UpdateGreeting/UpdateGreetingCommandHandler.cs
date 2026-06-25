using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.Greeting.UpdateGreeting;

internal sealed class UpdateGreetingCommandHandler(IApplicationDbContext dbContext)
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

        greeting.Update(
            request.Username,
            request.Title,
            request.SubTitle,
            request.ResumeUrl,
            request.DisplayGreeting);

        return Result.NoContent();
    }
}
