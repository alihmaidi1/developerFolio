using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.UpdateSkillStatement;

public sealed class UpdateSkillStatementEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/admin/skill-statements/{id:guid}", async (
                Guid id,
                UpdateSkillStatementRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(
                    new UpdateSkillStatementCommand(id, request.Text, request.IsPublished),
                    cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Skills")
            .WithSummary("Update a skill statement");
    }
}
