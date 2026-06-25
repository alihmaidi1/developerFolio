using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.ListSocialLinks;

public sealed class ListSocialLinksEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/admin/settings/social-links", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new ListSocialLinksQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Settings")
            .WithSummary("List all social links for administration");
    }
}
