using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.WorkExperience.UpdateWorkExperience;

internal sealed class UpdateWorkExperienceCommandHandler(
    IApplicationDbContext dbContext,
    IImageStorageService imageStorage)
    : IRequestHandler<UpdateWorkExperienceCommand, Result>
{
    public async Task<Result> Handle(
        UpdateWorkExperienceCommand request,
        CancellationToken cancellationToken)
    {
        var entry = await dbContext.WorkExperienceEntries
            .Include(item => item.DescriptionBullets)
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (entry is null)
        {
            return Result.NotFound(UpdateWorkExperienceErrors.NotFound);
        }

        var previousLogoUrl = entry.CompanyLogoUrl;

        entry.Update(
            request.Role,
            request.Company,
            request.Date,
            request.Description,
            request.CompanyLogoUrl,
            request.DescriptionBullets ?? [],
            request.IsPublished);

        if (!string.Equals(previousLogoUrl, entry.CompanyLogoUrl, StringComparison.Ordinal))
        {
            await imageStorage.RemoveAsync(previousLogoUrl, cancellationToken);
        }

        return Result.NoContent();
    }
}
