using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.GetSocialLink;

internal sealed class GetSocialLinkQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetSocialLinkQuery, TResult<SocialLinkResponse>>
{
    public async Task<TResult<SocialLinkResponse>> Handle(
        GetSocialLinkQuery request,
        CancellationToken cancellationToken)
    {
        var link = await dbContext.SocialLinks
            .AsNoTracking()
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        return link is null
            ? Result.NotFound<SocialLinkResponse>(GetSocialLinkErrors.NotFound)
            : Result.Success(SocialLinkResponse.From(link));
    }
}
