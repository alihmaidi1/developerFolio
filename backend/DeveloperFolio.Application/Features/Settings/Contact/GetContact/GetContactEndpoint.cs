using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Settings.Contact.GetContact;

public sealed class GetContactEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/admin/settings/contact", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new GetContactQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Settings")
            .WithSummary("Get contact settings");
    }
}
