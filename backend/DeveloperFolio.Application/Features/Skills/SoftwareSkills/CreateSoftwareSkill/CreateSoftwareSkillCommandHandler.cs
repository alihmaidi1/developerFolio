using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using DeveloperFolio.Domain.Skills;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.CreateSoftwareSkill;

internal sealed class CreateSoftwareSkillCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<CreateSoftwareSkillCommand, TResult<Guid>>
{
    public async Task<TResult<Guid>> Handle(
        CreateSoftwareSkillCommand request,
        CancellationToken cancellationToken)
    {
        var lastSortOrder = await dbContext.SoftwareSkills
            .MaxAsync(skill => (int?)skill.SortOrder, cancellationToken)
            ?? -1;

        var skill = SoftwareSkill.Create(
            request.Name,
            request.IconClassName,
            lastSortOrder + 1,
            request.IsPublished);

        dbContext.SoftwareSkills.Add(skill);
        return Result.Created(skill.Id);
    }
}
