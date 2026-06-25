using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Application.Features.Skills.SoftwareSkills.GetSoftwareSkill;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.SoftwareSkills.ListSoftwareSkills;

internal sealed record ListSoftwareSkillsQuery
    : IQuery<TResult<IReadOnlyCollection<SoftwareSkillResponse>>>;
