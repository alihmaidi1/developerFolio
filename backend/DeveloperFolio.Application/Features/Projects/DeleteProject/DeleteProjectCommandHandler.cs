using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Projects.DeleteProject;

internal sealed class DeleteProjectCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<DeleteProjectCommand, Result>
{
    public async Task<Result> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
    {
        var project = await dbContext.Projects
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (project is null)
        {
            return Result.NotFound(DeleteProjectErrors.NotFound);
        }

        dbContext.Projects.Remove(project);
        return Result.NoContent();
    }
}
