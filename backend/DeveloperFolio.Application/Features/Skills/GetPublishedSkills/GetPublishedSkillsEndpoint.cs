using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Skills.GetPublishedSkills;

public sealed class GetPublishedSkillsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/skills", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new GetPublishedSkillsQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .AllowAnonymous()
            .WithTags("Skills")
            .WithSummary("Get published skill statements and software skills");
    }
}
