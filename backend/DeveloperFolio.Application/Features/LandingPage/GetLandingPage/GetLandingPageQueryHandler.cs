using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Application.Features.Settings.Contact;
using DeveloperFolio.Application.Features.Settings.Greeting;
using DeveloperFolio.Domain.OperationResult;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DeveloperFolio.Application.Features.LandingPage.GetLandingPage;

internal sealed class GetLandingPageQueryHandler(IApplicationDbContext dbContext)
    : IRequestHandler<GetLandingPageQuery, TResult<LandingPageResponse>>
{
    public async Task<TResult<LandingPageResponse>> Handle(
        GetLandingPageQuery request,
        CancellationToken cancellationToken)
    {
        var greeting = await dbContext.GreetingSettings
            .AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);

        if (greeting is null)
        {
            return Result.NotFound<LandingPageResponse>(GreetingErrors.NotInitialized);
        }

        var contact = await dbContext.ContactSettings
            .AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken);

        if (contact is null)
        {
            return Result.NotFound<LandingPageResponse>(ContactErrors.NotInitialized);
        }

        var socialLinks = await dbContext.SocialLinks
            .AsNoTracking()
            .Where(link => link.IsPublished)
            .OrderBy(link => link.SortOrder)
            .ThenBy(link => link.Id)
            .Select(link => new PortfolioSocialLink(link.Id, link.Name, link.Url, link.IconClassName))
            .ToArrayAsync(cancellationToken);

        var projects = await dbContext.Projects
            .AsNoTracking()
            .Include(project => project.Technologies)
            .Where(project => project.IsPublished)
            .OrderBy(project => project.SortOrder)
            .ThenBy(project => project.Id)
            .ToArrayAsync(cancellationToken);

        var skillStatements = await dbContext.SkillStatements
            .AsNoTracking()
            .Where(statement => statement.IsPublished)
            .OrderBy(statement => statement.SortOrder)
            .ThenBy(statement => statement.Id)
            .Select(statement => new PublishedSkillStatement(statement.Id, statement.Text))
            .ToArrayAsync(cancellationToken);

        var softwareSkills = await dbContext.SoftwareSkills
            .AsNoTracking()
            .Where(skill => skill.IsPublished)
            .OrderBy(skill => skill.SortOrder)
            .ThenBy(skill => skill.Id)
            .Select(skill => new PublishedSoftwareSkill(skill.Id, skill.Name, skill.IconClassName))
            .ToArrayAsync(cancellationToken);

        var educations = await dbContext.EducationEntries
            .AsNoTracking()
            .Include(entry => entry.DescriptionBullets)
            .Where(entry => entry.IsPublished)
            .OrderBy(entry => entry.SortOrder)
            .ThenBy(entry => entry.Id)
            .ToArrayAsync(cancellationToken);

        var workExperiences = await dbContext.WorkExperienceEntries
            .AsNoTracking()
            .Include(entry => entry.DescriptionBullets)
            .Where(entry => entry.IsPublished)
            .OrderBy(entry => entry.SortOrder)
            .ToArrayAsync(cancellationToken);

        var settings = new PortfolioSettingsResponse(
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

        var response = new LandingPageResponse(
            settings,
            projects.Select(PublishedProjectResponse.From).ToArray(),
            new PublishedSkillsResponse(skillStatements, softwareSkills),
            educations.Select(PublishedEducationResponse.From).ToArray(),
            workExperiences.Select(PublishedWorkExperienceResponse.From).ToArray());

        return Result.Success(response);
    }
}
