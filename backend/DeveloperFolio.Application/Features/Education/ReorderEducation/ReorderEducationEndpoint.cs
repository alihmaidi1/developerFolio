using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Education.ReorderEducation;

public sealed class ReorderEducationEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPatch("/api/admin/education/{id:guid}/order", async (
                Guid id,
                ReorderEducationRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(
                    new ReorderEducationCommand(id, request.Direction),
                    cancellationToken);

                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Education")
            .WithSummary("Update an education entry's display order");
    }
}
