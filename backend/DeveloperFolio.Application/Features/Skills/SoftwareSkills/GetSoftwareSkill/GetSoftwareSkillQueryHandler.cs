using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.GetSoftwareSkill;

internal sealed class GetSoftwareSkillQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetSoftwareSkillQuery, TResult<SoftwareSkillResponse>>
{
    public async Task<TResult<SoftwareSkillResponse>> Handle(
        GetSoftwareSkillQuery request,
        CancellationToken cancellationToken)
    {
        var skill = await dbContext.SoftwareSkills
            .AsNoTracking()
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        return skill is null
            ? Result.NotFound<SoftwareSkillResponse>(GetSoftwareSkillErrors.NotFound)
            : Result.Success(SoftwareSkillResponse.From(skill));
    }
}
