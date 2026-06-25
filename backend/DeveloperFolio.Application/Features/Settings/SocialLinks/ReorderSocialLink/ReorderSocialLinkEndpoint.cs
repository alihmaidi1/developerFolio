using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.ReorderSocialLink;

public sealed class ReorderSocialLinkEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPatch("/api/admin/settings/social-links/{id:guid}/order", async (
                Guid id,
                ReorderSocialLinkRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(
                    new ReorderSocialLinkCommand(id, request.Direction),
                    cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Settings")
            .WithSummary("Update a social link's display order");
    }
}
