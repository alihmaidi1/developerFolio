using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Projects.ListPublishedProjects;

public sealed class ListPublishedProjectsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/projects", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new ListPublishedProjectsQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .AllowAnonymous()
            .WithTags("Projects")
            .WithSummary("List published portfolio projects");
    }
}
