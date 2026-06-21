using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;
using MediatR;

namespace DeveloperFolio.Application.Common.Behaviors;

internal sealed class UnitOfWorkBehavior<TRequest, TResponse>(IApplicationDbContext dbContext)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var response = await next();

        if (request is ICommand<TResponse> && (response is not Result result || result.IsSuccess))
        {
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        return response;
    }
}
