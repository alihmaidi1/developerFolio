using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.DeleteProject;

internal sealed record DeleteProjectCommand(Guid Id) : ICommand<Result>;

internal sealed class DeleteProjectCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<DeleteProjectCommand, Result>
{
    public async Task<Result> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
    {
        var project = await dbContext.Projects
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);
        if (project is null)
        {
            return Result.NotFound(new Error("Project.NotFound", "Project was not found."));
        }

        dbContext.Projects.Remove(project);
        return Result.NoContent();
    }
}

public sealed class DeleteProjectEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/admin/projects/{id:guid}", async (
                Guid id,
                ISender sender,
                CancellationToken cancellationToken) =>
            {
                var result = await sender.Send(new DeleteProjectCommand(id), cancellationToken);
                return result.ToHttpResult();
            })
            .RequireAuthorization("AdminOnly")
            .WithTags("Admin / Projects")
            .WithSummary("Delete a project");
    }
}
