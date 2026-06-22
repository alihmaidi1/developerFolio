using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using DeveloperFolio.Domain.Projects;
using MediatR;

namespace DeveloperFolio.Application.Features.Projects.CreateProject;

internal sealed class CreateProjectCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<CreateProjectCommand, TResult<Guid>>
{
    public Task<TResult<Guid>> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = PortfolioProject.Create(
            request.Title,
            request.Summary,
            request.Description,
            request.ImageUrl,
            request.RepositoryUrl,
            request.LiveUrl,
            request.Technologies ?? [],
            request.SortOrder,
            request.IsPublished);

        dbContext.Projects.Add(project);
        return Task.FromResult(Result.Created(project.Id));
    }
}
