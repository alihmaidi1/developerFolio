using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.Settings.Contact;
using DeveloperFolio.Application.Features.Settings.Greeting;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.GetPortfolioSettings;

internal sealed class GetPortfolioSettingsQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetPortfolioSettingsQuery, TResult<PortfolioSettingsResponse>>
{
    public async Task<TResult<PortfolioSettingsResponse>> Handle(
        GetPortfolioSettingsQuery request,
        CancellationToken cancellationToken)
    {
        var greeting = await dbContext.GreetingSettings
            .AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);

        if (greeting is null)
        {
            return Result.NotFound<PortfolioSettingsResponse>(GreetingErrors.NotInitialized);
        }

        var contact = await dbContext.ContactSettings
            .AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);

        if (contact is null)
        {
            return Result.NotFound<PortfolioSettingsResponse>(ContactErrors.NotInitialized);
        }

        var socialLinks = await dbContext.SocialLinks
            .AsNoTracking()
            .Where(link => link.IsPublished)
            .OrderBy(link => link.SortOrder)
            .ThenByDescending(link => link.CreatedAtUtc)
            .Select(link => new PortfolioSocialLink(link.Id, link.Name, link.Url, link.IconClassName))
            .ToArrayAsync(cancellationToken);

        var response = new PortfolioSettingsResponse(
            new PortfolioGreeting(
                greeting.Username,
                greeting.Title,
                greeting.SubTitle,
                greeting.ResumeUrl,
                greeting.DisplayGreeting),
            new PortfolioContact(
                contact.Title,
                contact.Subtitle,
                contact.Email,
                contact.Phone,
                contact.Address),
            socialLinks);

        return Result.Success(response);
    }
}
