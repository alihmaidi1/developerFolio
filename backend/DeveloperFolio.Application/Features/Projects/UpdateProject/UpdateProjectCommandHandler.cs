using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.UpdateProject;

internal sealed class UpdateProjectCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<UpdateProjectCommand, Result>
{
    public async Task<Result> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = await dbContext.Projects
            .Include(item => item.Technologies)
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (project is null)
        {
            return Result.NotFound(UpdateProjectErrors.NotFound);
        }

        project.Update(
            request.Title,
            request.Summary,
            request.Description,
            request.ImageUrl,
            request.RepositoryUrl,
            request.LiveUrl,
            request.Technologies ?? [],
            request.IsPublished);

        return Result.NoContent();
    }
}
