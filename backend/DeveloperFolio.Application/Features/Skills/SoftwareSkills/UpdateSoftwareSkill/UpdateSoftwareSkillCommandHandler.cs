using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.UpdateSoftwareSkill;

internal sealed class UpdateSoftwareSkillCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<UpdateSoftwareSkillCommand, Result>
{
    public async Task<Result> Handle(
        UpdateSoftwareSkillCommand request,
        CancellationToken cancellationToken)
    {
        var skill = await dbContext.SoftwareSkills
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (skill is null)
        {
            return Result.NotFound(UpdateSoftwareSkillErrors.NotFound);
        }

        skill.Update(request.Name, request.IconClassName, request.IsPublished);
        return Result.NoContent();
    }
}
