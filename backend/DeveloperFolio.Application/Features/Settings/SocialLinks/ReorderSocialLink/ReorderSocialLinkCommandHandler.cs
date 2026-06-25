using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.Settings.SocialLinks.ReorderSocialLink;

internal sealed class ReorderSocialLinkCommandHandler(IApplicationDbContext dbContext)
    : IRequestHandler<ReorderSocialLinkCommand, Result>
{
    public async Task<Result> Handle(ReorderSocialLinkCommand request, CancellationToken cancellationToken)
    {
        var links = await dbContext.SocialLinks
            .OrderBy(link => link.SortOrder)
            .ThenBy(link => link.CreatedAtUtc)
            .ThenBy(link => link.Id)
            .ToListAsync(cancellationToken);

        var currentIndex = links.FindIndex(link => link.Id == request.Id);

        if (currentIndex < 0)
        {
            return Result.NotFound(ReorderSocialLinkErrors.NotFound);
        }

        var targetIndex = request.Direction.Equals("up", StringComparison.OrdinalIgnoreCase)
            ? currentIndex - 1
            : currentIndex + 1;

        if (targetIndex < 0 || targetIndex >= links.Count)
        {
            return Result.NoContent();
        }

        (links[currentIndex], links[targetIndex]) = (links[targetIndex], links[currentIndex]);

        for (var index = 0; index < links.Count; index++)
        {
            links[index].SetSortOrder(index);
        }

        return Result.NoContent();
    }
}
