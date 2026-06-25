using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.ReorderSoftwareSkill;

internal sealed record ReorderSoftwareSkillCommand(Guid Id, string Direction) : ICommand<Result>;
