using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.WorkExperience.ListPublishedWorkExperiences;

internal sealed record ListPublishedWorkExperiencesQuery
    : IQuery<TResult<IReadOnlyCollection<PublishedWorkExperienceResponse>>>;
