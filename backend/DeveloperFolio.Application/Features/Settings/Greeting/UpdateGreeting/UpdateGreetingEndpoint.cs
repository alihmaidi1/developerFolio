using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Settings.Greeting.UpdateGreeting;

public sealed class UpdateGreetingEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/admin/settings/greeting", async (
                UpdateGreetingRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new UpdateGreetingCommand(
                    request.Username,
                    request.Title,
                    request.SubTitle,
                    request.ResumeUrl,
                    request.DisplayGreeting);

                var result = await sender.Send(command, cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Settings")
            .WithSummary("Update greeting settings");
    }
}
