using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Projects.UpdateProject;

public sealed class UpdateProjectEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/admin/projects/{id:guid}", async (
                Guid id,
                UpdateProjectRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new UpdateProjectCommand(
                    id,
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
            .WithSummary("Update a portfolio project");
    }
}
