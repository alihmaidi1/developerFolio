using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.GetProject;

internal sealed class GetProjectQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetProjectQuery, TResult<ProjectResponse>>
{
    public async Task<TResult<ProjectResponse>> Handle(
        GetProjectQuery request,
        CancellationToken cancellationToken)
    {
        var project = await dbContext.Projects
            .AsNoTracking()
            .Include(project => project.Technologies)
            .SingleOrDefaultAsync(project => project.Id == request.Id, cancellationToken);

        return project is null
            ? Result.NotFound<ProjectResponse>(GetProjectErrors.NotFound)
            : Result.Success(ProjectResponse.From(project));
    }
}
