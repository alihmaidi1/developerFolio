using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.Education;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Education.CreateEducation;

internal sealed class CreateEducationCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<CreateEducationCommand, TResult<Guid>>
{
    public async Task<TResult<Guid>> Handle(
        CreateEducationCommand request,
        CancellationToken cancellationToken)
    {
        var lastSortOrder = await dbContext.EducationEntries
            .MaxAsync(entry => (int?)entry.SortOrder, cancellationToken)
            ?? -1;

        var entry = EducationEntry.Create(
            request.SchoolName,
            request.Degree,
            request.Duration,
            request.Description,
            request.LogoUrl,
            request.DescriptionBullets ?? [],
            lastSortOrder + 1,
            request.IsPublished);

        dbContext.EducationEntries.Add(entry);
        return Result.Created(entry.Id);
    }
}
