using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.WorkExperience.ListWorkExperiences;

public sealed class ListWorkExperiencesEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/admin/work-experience", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new ListWorkExperiencesQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("WorkExperience")
            .WithSummary("List all work experience entries for administration");
    }
}
