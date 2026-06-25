using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.DeleteSoftwareSkill;

internal sealed record DeleteSoftwareSkillCommand(Guid Id) : ICommand<Result>;
