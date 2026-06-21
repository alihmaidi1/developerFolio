using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Auth.Login;

public sealed class LoginEndPoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", async (
                LoginRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new LoginCommand(request.Email, request.Password);
                var result = await sender.Send(command, cancellationToken);
                return result.ToHttpResult();
            })
            .AllowAnonymous()
            .WithTags("Auth")
            .WithSummary("Sign in to the admin dashboard");
    }
}
