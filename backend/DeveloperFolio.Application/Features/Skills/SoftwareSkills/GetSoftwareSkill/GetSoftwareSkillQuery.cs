using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.GetSoftwareSkill;

internal sealed record GetSoftwareSkillQuery(Guid Id) : IQuery<TResult<SoftwareSkillResponse>>;
