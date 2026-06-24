using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Education.GetEducation;

internal sealed class GetEducationQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetEducationQuery, TResult<EducationResponse>>
{
    public async Task<TResult<EducationResponse>> Handle(
        GetEducationQuery request,
        CancellationToken cancellationToken)
    {
        var entry = await dbContext.EducationEntries
            .AsNoTracking()
            .Include(item => item.DescriptionBullets)
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        return entry is null
            ? Result.NotFound<EducationResponse>(GetEducationErrors.NotFound)
            : Result.Success(EducationResponse.From(entry));
    }
}
