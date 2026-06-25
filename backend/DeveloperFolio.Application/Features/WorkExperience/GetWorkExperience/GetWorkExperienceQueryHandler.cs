using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.WorkExperience.GetWorkExperience;

internal sealed class GetWorkExperienceQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetWorkExperienceQuery, TResult<WorkExperienceResponse>>
{
    public async Task<TResult<WorkExperienceResponse>> Handle(
        GetWorkExperienceQuery request,
        CancellationToken cancellationToken)
    {
        var entry = await dbContext.WorkExperienceEntries
            .AsNoTracking()
            .Include(item => item.DescriptionBullets)
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        return entry is null
            ? Result.NotFound<WorkExperienceResponse>(GetWorkExperienceErrors.NotFound)
            : Result.Success(WorkExperienceResponse.From(entry));
    }
}
