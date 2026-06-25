using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.Settings.SocialLinks.GetSocialLink;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.ListSocialLinks;

internal sealed class ListSocialLinksQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ListSocialLinksQuery, TResult<IReadOnlyCollection<SocialLinkResponse>>>
{
    public async Task<TResult<IReadOnlyCollection<SocialLinkResponse>>> Handle(
        ListSocialLinksQuery request,
        CancellationToken cancellationToken)
    {
        var links = await dbContext.SocialLinks
            .AsNoTracking()
            .OrderBy(link => link.SortOrder)
            .ThenByDescending(link => link.CreatedAtUtc)
            .ToArrayAsync(cancellationToken);

        return Result.Success<IReadOnlyCollection<SocialLinkResponse>>(
            links.Select(SocialLinkResponse.From).ToArray());
    }
}
