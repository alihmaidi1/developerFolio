using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.GetPublishedSkills;

internal sealed class GetPublishedSkillsQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetPublishedSkillsQuery, TResult<PublishedSkillsResponse>>
{
    public async Task<TResult<PublishedSkillsResponse>> Handle(
        GetPublishedSkillsQuery request,
        CancellationToken cancellationToken)
    {
        var statements = await dbContext.SkillStatements
            .AsNoTracking()
            .Where(statement => statement.IsPublished)
            .OrderBy(statement => statement.SortOrder)
            .ThenByDescending(statement => statement.CreatedAtUtc)
            .Select(statement => new PublishedSkillStatement(statement.Id, statement.Text))
            .ToArrayAsync(cancellationToken);

        var softwareSkills = await dbContext.SoftwareSkills
            .AsNoTracking()
            .Where(skill => skill.IsPublished)
            .OrderBy(skill => skill.SortOrder)
            .ThenByDescending(skill => skill.CreatedAtUtc)
            .Select(skill => new PublishedSoftwareSkill(skill.Id, skill.Name, skill.IconClassName))
            .ToArrayAsync(cancellationToken);

        return Result.Success(new PublishedSkillsResponse(statements, softwareSkills));
    }
}
