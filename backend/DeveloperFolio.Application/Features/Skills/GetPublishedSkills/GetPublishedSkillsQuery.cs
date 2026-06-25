using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Skills.GetPublishedSkills;

internal sealed record GetPublishedSkillsQuery : IQuery<TResult<PublishedSkillsResponse>>;
