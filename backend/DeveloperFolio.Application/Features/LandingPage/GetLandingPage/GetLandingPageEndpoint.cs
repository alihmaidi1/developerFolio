using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.LandingPage.GetLandingPage;

public sealed class GetLandingPageEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/landing-page", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new GetLandingPageQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .AllowAnonymous()
            .WithTags("Landing Page")
            .WithSummary("Get all public landing page data in a single request");
    }
}
