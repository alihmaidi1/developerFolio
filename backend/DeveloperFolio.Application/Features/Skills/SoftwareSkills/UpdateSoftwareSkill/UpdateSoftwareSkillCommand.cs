using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.UpdateSoftwareSkill;

internal sealed record UpdateSoftwareSkillCommand(
    Guid Id,
    string Name,
    string IconClassName,
    bool IsPublished) : ICommand<Result>;
