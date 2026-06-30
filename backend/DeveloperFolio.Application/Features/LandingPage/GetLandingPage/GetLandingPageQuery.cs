using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.LandingPage.GetLandingPage;

internal sealed record GetLandingPageQuery : IQuery<TResult<LandingPageResponse>>;
