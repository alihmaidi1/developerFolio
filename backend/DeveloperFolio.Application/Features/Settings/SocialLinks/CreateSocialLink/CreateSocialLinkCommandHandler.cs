using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using DeveloperFolio.Domain.Settings;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.CreateSocialLink;

internal sealed class CreateSocialLinkCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<CreateSocialLinkCommand, TResult<Guid>>
{
    public async Task<TResult<Guid>> Handle(
        CreateSocialLinkCommand request,
        CancellationToken cancellationToken)
    {
        var lastSortOrder = await dbContext.SocialLinks
            .MaxAsync(link => (int?)link.SortOrder, cancellationToken)
            ?? -1;

        var link = SocialLink.Create(
            request.Name,
            request.Url,
            request.IconClassName,
            lastSortOrder + 1,
            request.IsPublished);

        dbContext.SocialLinks.Add(link);
        return Result.Created(link.Id);
    }
}
