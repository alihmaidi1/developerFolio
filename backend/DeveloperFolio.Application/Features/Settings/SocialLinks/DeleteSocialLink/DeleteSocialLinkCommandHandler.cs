using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.DeleteSocialLink;

internal sealed class DeleteSocialLinkCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<DeleteSocialLinkCommand, Result>
{
    public async Task<Result> Handle(DeleteSocialLinkCommand request, CancellationToken cancellationToken)
    {
        var link = await dbContext.SocialLinks
            .SingleOrDefaultAsync(item => item.Id == request.Id, cancellationToken);

        if (link is null)
        {
            return Result.NotFound(DeleteSocialLinkErrors.NotFound);
        }

        dbContext.SocialLinks.Remove(link);
        return Result.NoContent();
    }
}
