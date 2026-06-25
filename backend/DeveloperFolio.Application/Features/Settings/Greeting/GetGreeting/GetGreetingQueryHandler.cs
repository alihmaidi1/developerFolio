using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.Greeting.GetGreeting;

internal sealed class GetGreetingQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetGreetingQuery, TResult<GreetingResponse>>
{
    public async Task<TResult<GreetingResponse>> Handle(
        GetGreetingQuery request,
        CancellationToken cancellationToken)
    {
        var greeting = await dbContext.GreetingSettings
            .AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);

        return greeting is null
            ? Result.NotFound<GreetingResponse>(GreetingErrors.NotInitialized)
            : Result.Success(GreetingResponse.From(greeting));
    }
}
