using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Education.ListEducations;

public sealed class ListEducationsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/admin/education", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new ListEducationsQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Education")
            .WithSummary("List all education entries for administration");
    }
}
