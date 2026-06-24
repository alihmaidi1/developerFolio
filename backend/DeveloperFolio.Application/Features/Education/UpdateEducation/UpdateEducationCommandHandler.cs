using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Education.UpdateEducation;

internal sealed class UpdateEducationCommandHandler(
    IApplicationDbContext dbContext,
    IImageStorageService imageStorage)
    : IRequestHandler<UpdateEducationCommand, Result>
{
    public async Task<Result> Handle(UpdateEducationCommand request, CancellationToken cancellationToken)
    {
        var entry = await dbContext.EducationEntries
            .Include(item => item.DescriptionBullets)
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (entry is null)
        {
            return Result.NotFound(UpdateEducationErrors.NotFound);
        }

        var previousLogoUrl = entry.LogoUrl;

        entry.Update(
            request.SchoolName,
            request.Degree,
            request.Duration,
            request.Description,
            request.LogoUrl,
            request.DescriptionBullets ?? [],
            request.IsPublished);

        if (!string.Equals(previousLogoUrl, entry.LogoUrl, StringComparison.Ordinal))
        {
            await imageStorage.RemoveAsync(previousLogoUrl, cancellationToken);
        }

        return Result.NoContent();
    }
}
