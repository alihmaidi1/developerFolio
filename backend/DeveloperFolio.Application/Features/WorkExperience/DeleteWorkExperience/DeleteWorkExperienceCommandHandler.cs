using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.WorkExperience.DeleteWorkExperience;

internal sealed class DeleteWorkExperienceCommandHandler(
    IApplicationDbContext dbContext,
    IImageStorageService imageStorage)
    : IRequestHandler<DeleteWorkExperienceCommand, Result>
{
    public async Task<Result> Handle(
        DeleteWorkExperienceCommand request,
        CancellationToken cancellationToken)
    {
        var entry = await dbContext.WorkExperienceEntries
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (entry is null)
        {
            return Result.NotFound(DeleteWorkExperienceErrors.NotFound);
        }

        await imageStorage.RemoveAsync(entry.CompanyLogoUrl, cancellationToken);
        dbContext.WorkExperienceEntries.Remove(entry);
        return Result.NoContent();
    }
}
