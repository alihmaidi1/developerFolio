using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.GetProject;

internal sealed record GetProjectQuery(Guid Id, bool IncludeUnpublished) : IQuery<TResult<ProjectResponse>>;

internal sealed class GetProjectQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetProjectQuery, TResult<ProjectResponse>>
{
    public async Task<TResult<ProjectResponse>> Handle(GetProjectQuery request, CancellationToken cancellationToken)
    {
        var query = dbContext.Projects
            .AsNoTracking()
            .Include(project => project.Technologies)
            .Where(project => project.Id == request.Id);

        if (!request.IncludeUnpublished)
        {
            query = query.Where(project => project.IsPublished);
        }

        var project = await query.SingleOrDefaultAsync(cancellationToken);
        if (project is null)
        {
            return Result.NotFound<ProjectResponse>(
                new Error("Project.NotFound", "Project was not found."));
        }

        return Result.Success(ProjectResponse.From(project));
    }
}

public sealed class GetProjectEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/projects/{id:guid}", async (Guid id, ISender sender, CancellationToken cancellationToken) =>
                (await sender.Send(new GetProjectQuery(id, false), cancellationToken)).ToHttpResult())
            .AllowAnonymous()
            .WithTags("Projects")
            .WithSummary("Get a published project");

        app.MapGet("/api/admin/projects/{id:guid}", async (Guid id, ISender sender, CancellationToken cancellationToken) =>
                (await sender.Send(new GetProjectQuery(id, true), cancellationToken)).ToHttpResult())
            .RequireAuthorization("AdminOnly")
            .WithTags("Admin / Projects")
            .WithSummary("Get any project");
    }
}
