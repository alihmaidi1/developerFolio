using Carter;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.ListProjects;

internal sealed record ListProjectsQuery(bool IncludeUnpublished)
    : IQuery<TResult<IReadOnlyCollection<ProjectResponse>>>;

internal sealed class ListProjectsQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListProjectsQuery, TResult<IReadOnlyCollection<ProjectResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<ProjectResponse>>> Handle(
        ListProjectsQuery request,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Projects.AsNoTracking().AsQueryable();
        if (!request.IncludeUnpublished)
        {
            query = query.Where(project => project.IsPublished);
        }

        var projects = await query
            .Include(project => project.Technologies)
            .OrderBy(project => project.SortOrder)
            .ThenBy(project => project.Title)
            .Select(project => ProjectResponse.From(project))
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<ProjectResponse>>(projects);
    }
}

public sealed class ListProjectsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/projects", async (ISender sender, CancellationToken cancellationToken) =>
                (await sender.Send(new ListProjectsQuery(false), cancellationToken)).ToHttpResult())
            .AllowAnonymous()
            .WithTags("Projects")
            .WithSummary("List published projects");

        app.MapGet("/api/admin/projects", async (ISender sender, CancellationToken cancellationToken) =>
                (await sender.Send(new ListProjectsQuery(true), cancellationToken)).ToHttpResult())
            .RequireAuthorization("AdminOnly")
            .WithTags("Admin / Projects")
            .WithSummary("List all projects");
    }
}
