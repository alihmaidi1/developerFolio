using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Education.DeleteEducation;

internal sealed class DeleteEducationCommandHandler(
    IApplicationDbContext dbContext,
    IImageStorageService imageStorage)
    : IRequestHandler<DeleteEducationCommand, Result>
{
    public async Task<Result> Handle(DeleteEducationCommand request, CancellationToken cancellationToken)
    {
        var entry = await dbContext.EducationEntries
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (entry is null)
        {
            return Result.NotFound(DeleteEducationErrors.NotFound);
        }

        await imageStorage.RemoveAsync(entry.LogoUrl, cancellationToken);
        dbContext.EducationEntries.Remove(entry);
        return Result.NoContent();
    }
}
