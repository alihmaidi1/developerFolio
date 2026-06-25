using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.DeleteSoftwareSkill;

internal sealed class DeleteSoftwareSkillCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<DeleteSoftwareSkillCommand, Result>
{
    public async Task<Result> Handle(
        DeleteSoftwareSkillCommand request,
        CancellationToken cancellationToken)
    {
        var skill = await dbContext.SoftwareSkills
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (skill is null)
        {
            return Result.NotFound(DeleteSoftwareSkillErrors.NotFound);
        }

        dbContext.SoftwareSkills.Remove(skill);
        return Result.NoContent();
    }
}
