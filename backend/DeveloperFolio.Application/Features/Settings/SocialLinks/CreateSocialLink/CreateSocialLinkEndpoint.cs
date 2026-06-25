using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.CreateSocialLink;

public sealed class CreateSocialLinkEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/settings/social-links", async (
                CreateSocialLinkRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new CreateSocialLinkCommand(
                    request.Name,
                    request.Url,
                    request.IconClassName,
                    request.IsPublished);
                var result = await sender.Send(command, cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Settings")
            .WithSummary("Create a social link");
    }
}
