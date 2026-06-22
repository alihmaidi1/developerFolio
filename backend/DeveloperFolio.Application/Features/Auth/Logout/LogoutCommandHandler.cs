using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;

namespace DeveloperFolio.Application.Features.Auth.Logout;

internal sealed class LogoutCommandHandler(IAdminSessionCookie sessionCookie)
    : IRequestHandler<LogoutCommand, Result>
{
    public Task<Result> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        sessionCookie.Clear();
        return Task.FromResult(Result.NoContent());
    }
}
