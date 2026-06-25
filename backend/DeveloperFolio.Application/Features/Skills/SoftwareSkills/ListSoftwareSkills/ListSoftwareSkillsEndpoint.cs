using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.ListSoftwareSkills;

public sealed class ListSoftwareSkillsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/admin/software-skills", async (ISender sender, CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new ListSoftwareSkillsQuery(), cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Skills")
            .WithSummary("List all software skills for administration");
    }
}
