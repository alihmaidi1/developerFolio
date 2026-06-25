using Carter;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace DeveloperFolio.Application.Features.Skills.SkillStatements.CreateSkillStatement;

public sealed class CreateSkillStatementEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/admin/skill-statements", async (
                CreateSkillStatementRequest request,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var command = new CreateSkillStatementCommand(request.Text, request.IsPublished);
                var result = await sender.Send(command, cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Skills")
            .WithSummary("Create a skill statement");
    }
}
