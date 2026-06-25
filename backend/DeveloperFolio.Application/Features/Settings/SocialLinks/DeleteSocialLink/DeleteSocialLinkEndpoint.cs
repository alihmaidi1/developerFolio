using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.DeleteSocialLink;

public sealed class DeleteSocialLinkEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/admin/settings/social-links/{id:guid}", async (
                Guid id,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new DeleteSocialLinkCommand(id), cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Settings")
            .WithSummary("Delete a social link");
    }
}
