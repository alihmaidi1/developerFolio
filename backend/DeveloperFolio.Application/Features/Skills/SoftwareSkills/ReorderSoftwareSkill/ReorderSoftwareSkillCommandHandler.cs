using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.ReorderSoftwareSkill;

internal sealed class ReorderSoftwareSkillCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ReorderSoftwareSkillCommand, Result>
{
    public async Task<Result> Handle(
        ReorderSoftwareSkillCommand request,
        CancellationToken cancellationToken)
    {
        var skills = await dbContext.SoftwareSkills
            .OrderBy(skill => skill.SortOrder)
            .ThenBy(skill => skill.CreatedAtUtc)
            .ThenBy(skill => skill.Id)
            .ToListAsync(cancellationToken);

        var currentIndex = skills.FindIndex(skill => skill.Id == request.Id);

        if (currentIndex < 0)
        {
            return Result.NotFound(ReorderSoftwareSkillErrors.NotFound);
        }

        var targetIndex = request.Direction.Equals("up", StringComparison.OrdinalIgnoreCase)
            ? currentIndex - 1
            : currentIndex + 1;

        if (targetIndex < 0 || targetIndex >= skills.Count)
        {
            return Result.NoContent();
        }

        (skills[currentIndex], skills[targetIndex]) = (skills[targetIndex], skills[currentIndex]);

        for (var index = 0; index < skills.Count; index++)
        {
            skills[index].SetSortOrder(index);
        }

        return Result.NoContent();
    }
}
