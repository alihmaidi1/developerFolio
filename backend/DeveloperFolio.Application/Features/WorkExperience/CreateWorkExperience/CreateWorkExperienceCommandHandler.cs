using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using DeveloperFolio.Domain.WorkExperience;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.WorkExperience.CreateWorkExperience;

internal sealed class CreateWorkExperienceCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<CreateWorkExperienceCommand, TResult<Guid>>
{
    public async Task<TResult<Guid>> Handle(
        CreateWorkExperienceCommand request,
        CancellationToken cancellationToken)
    {
        var lastSortOrder = await dbContext.WorkExperienceEntries
            .MaxAsync(entry => (int?)entry.SortOrder, cancellationToken)
            ?? -1;

        var entry = WorkExperienceEntry.Create(
            request.Role,
            request.Company,
            request.Date,
            request.Description,
            request.CompanyLogoUrl,
            request.DescriptionBullets ?? [],
            lastSortOrder + 1,
            request.IsPublished);

        dbContext.WorkExperienceEntries.Add(entry);
        return Result.Created(entry.Id);
    }
}
