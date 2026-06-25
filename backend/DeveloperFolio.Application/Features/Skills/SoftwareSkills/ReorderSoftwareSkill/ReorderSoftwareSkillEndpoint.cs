using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.ReorderSoftwareSkill;

public sealed class ReorderSoftwareSkillEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPatch("/api/admin/software-skills/{id:guid}/order", async (
                Guid id,
                ReorderSoftwareSkillRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(
                    new ReorderSoftwareSkillCommand(id, request.Direction),
                    cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Skills")
            .WithSummary("Update a software skill's display order");
    }
}
