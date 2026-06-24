using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Education.ListPublishedEducations;

public sealed class ListPublishedEducationsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/education", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new ListPublishedEducationsQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .AllowAnonymous()
            .WithTags("Education")
            .WithSummary("List published education entries");
    }
}
