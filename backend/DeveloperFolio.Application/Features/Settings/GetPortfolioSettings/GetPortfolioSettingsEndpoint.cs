using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Settings.GetPortfolioSettings;

public sealed class GetPortfolioSettingsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/portfolio-settings", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new GetPortfolioSettingsQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .AllowAnonymous()
            .WithTags("Settings")
            .WithSummary("Get the public portfolio settings (greeting, contact, social links)");
    }
}
