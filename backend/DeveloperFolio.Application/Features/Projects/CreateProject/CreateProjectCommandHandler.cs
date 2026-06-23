using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using DeveloperFolio.Domain.Projects;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.CreateProject;

internal sealed class CreateProjectCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<CreateProjectCommand, TResult<Guid>>
{
    public async Task<TResult<Guid>> Handle(
        CreateProjectCommand request,
        CancellationToken cancellationToken)
    {
        var lastSortOrder = await dbContext.Projects
            .MaxAsync(project => (int?)project.SortOrder, cancellationToken)
            ?? -1;

        var project = PortfolioProject.Create(
            request.Title,
            request.Summary,
            request.Description,
            request.ImageUrl,
            request.RepositoryUrl,
            request.LiveUrl,
            request.Technologies ?? [],
            lastSortOrder + 1,
            request.IsPublished);

        dbContext.Projects.Add(project);
        return Result.Created(project.Id);
    }
}
