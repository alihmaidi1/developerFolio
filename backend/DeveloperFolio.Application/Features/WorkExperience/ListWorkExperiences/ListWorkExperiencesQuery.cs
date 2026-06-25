using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Application.Features.WorkExperience.GetWorkExperience;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.ListWorkExperiences;

internal sealed record ListWorkExperiencesQuery
    : IQuery<TResult<IReadOnlyCollection<WorkExperienceResponse>>>;
