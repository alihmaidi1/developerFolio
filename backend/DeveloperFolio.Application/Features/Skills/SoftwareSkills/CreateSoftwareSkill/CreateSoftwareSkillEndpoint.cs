using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.CreateSoftwareSkill;

public sealed class CreateSoftwareSkillEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/software-skills", async (
                CreateSoftwareSkillRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new CreateSoftwareSkillCommand(
                    request.Name,
                    request.IconClassName,
                    request.IsPublished);
                var result = await sender.Send(command, cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Skills")
            .WithSummary("Create a software skill");
    }
}
