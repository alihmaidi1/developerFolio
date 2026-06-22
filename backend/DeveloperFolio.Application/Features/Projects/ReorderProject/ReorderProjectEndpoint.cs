using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Projects.ReorderProject;

public sealed class ReorderProjectEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPatch("/api/admin/projects/{id:guid}/order", async (
                Guid id,
                ReorderProjectRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(
                    new ReorderProjectCommand(id, request.Direction),
                    cancellationToken);

                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Projects")
            .WithSummary("Update a portfolio project's display order");
    }
}
