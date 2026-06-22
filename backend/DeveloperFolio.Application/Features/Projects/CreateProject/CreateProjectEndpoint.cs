using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Projects.CreateProject;

public sealed class CreateProjectEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/projects", async (
                CreateProjectRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new CreateProjectCommand(
                    request.Title,
                    request.Summary,
                    request.Description,
                    request.ImageUrl,
                    request.RepositoryUrl,
                    request.LiveUrl,
                    request.Technologies,
                    request.SortOrder,
                    request.IsPublished);

                var result = await sender.Send(command, cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Projects")
            .WithSummary("Create a portfolio project");
    }
}
