using System.Security.Claims;
using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Auth.Session;

public sealed class GetAdminSessionEndPoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/auth/session", async (
                ClaimsPrincipal principal,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var subject = principal.FindFirstValue("sub")
                    ?? principal.FindFirstValue(ClaimTypes.NameIdentifier);
                if (!Guid.TryParse(subject, out var adminId))
                {
                    return Result.Unauthorized<AdminSessionResponse>(
                        new Error("Auth.SessionInvalid", "The admin session is invalid."))
                        .ToHttpResult();
                }

                var result = await sender.Send(new GetAdminSessionQuery(adminId), cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Auth")
            .WithSummary("Get the current admin session");
    }
}
