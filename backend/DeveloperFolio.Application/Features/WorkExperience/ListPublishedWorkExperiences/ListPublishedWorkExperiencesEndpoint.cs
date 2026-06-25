using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.WorkExperience.ListPublishedWorkExperiences;

public sealed class ListPublishedWorkExperiencesEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/work-experience", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new ListPublishedWorkExperiencesQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .AllowAnonymous()
            .WithTags("WorkExperience")
            .WithSummary("List published work experience entries");
    }
}
