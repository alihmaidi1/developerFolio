using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.Skills.SoftwareSkills.GetSoftwareSkill;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.ListSoftwareSkills;

internal sealed class ListSoftwareSkillsQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListSoftwareSkillsQuery, TResult<IReadOnlyCollection<SoftwareSkillResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<SoftwareSkillResponse>>> Handle(
        ListSoftwareSkillsQuery request,
        CancellationToken cancellationToken)
    {
        var skills = await dbContext.SoftwareSkills
            .AsNoTracking()
            .OrderBy(skill => skill.SortOrder)
            .ThenByDescending(skill => skill.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<SoftwareSkillResponse>>(
            skills.Select(SoftwareSkillResponse.From).ToArray());
    }
}
