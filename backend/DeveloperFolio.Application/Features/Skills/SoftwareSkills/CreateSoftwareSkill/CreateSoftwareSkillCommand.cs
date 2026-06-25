using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.CreateSoftwareSkill;

internal sealed record CreateSoftwareSkillCommand(
    string Name,
    string IconClassName,
    bool IsPublished) : ICommand<TResult<Guid>>;
