using DeveloperFolio.Application.Common.Messaging;
using DeveloperFolio.Domain.OperationResult;

namespace DeveloperFolio.Application.Features.Settings.GetPortfolioSettings;

internal sealed record GetPortfolioSettingsQuery : IQuery<TResult<PortfolioSettingsResponse>>;
