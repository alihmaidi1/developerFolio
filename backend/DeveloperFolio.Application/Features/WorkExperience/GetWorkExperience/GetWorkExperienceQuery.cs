using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.GetWorkExperience;

internal sealed record GetWorkExperienceQuery(Guid Id) : IQuery<TResult<WorkExperienceResponse>>;
