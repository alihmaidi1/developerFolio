using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.GetSocialLink;

public sealed class GetSocialLinkEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/admin/settings/social-links/{id:guid}", async (
                Guid id,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new GetSocialLinkQuery(id), cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Settings")
            .WithSummary("Get a social link for administration");
    }
}
