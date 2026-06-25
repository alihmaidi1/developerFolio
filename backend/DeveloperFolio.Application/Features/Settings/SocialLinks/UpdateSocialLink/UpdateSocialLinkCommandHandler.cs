using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.UpdateSocialLink;

internal sealed class UpdateSocialLinkCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<UpdateSocialLinkCommand, Result>
{
    public async Task<Result> Handle(UpdateSocialLinkCommand request, CancellationToken cancellationToken)
    {
        var link = await dbContext.SocialLinks
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (link is null)
        {
            return Result.NotFound(UpdateSocialLinkErrors.NotFound);
        }

        link.Update(request.Name, request.Url, request.IconClassName, request.IsPublished);
        return Result.NoContent();
    }
}
