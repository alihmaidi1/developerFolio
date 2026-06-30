using DeveloperFolio.Domain.Education;
using DeveloperFolio.Domain.Projects;
using DeveloperFolio.Domain.WorkExperience;

namespace DeveloperFolio.Application.Features.LandingPage.GetLandingPage;

public sealed record PortfolioGreeting(
    string Username,
    string Title,
    string SubTitle,
    string? ResumeUrl,
    bool DisplayGreeting);

public sealed record PortfolioContact(
    string Title,
    string Subtitle,
    string? Email,
    string? Phone,
    string? Address);

public sealed record PortfolioSocialLink(
    Guid Id,
    string Name,
    string Url,
    string IconClassName);

public sealed record PortfolioSettingsResponse(
    PortfolioGreeting Greeting,
    PortfolioContact Contact,
    IReadOnlyCollection<PortfolioSocialLink> SocialLinks);

public sealed record PublishedProjectResponse(
    Guid Id,
    string Title,
    string Summary,
    string? Description,
    string? ImageUrl,
    string? RepositoryUrl,
    string? LiveUrl,
    IReadOnlyCollection<string> Technologies)
{
    internal static PublishedProjectResponse From(PortfolioProject project) =>
        new(
            project.Id,
            project.Title,
            project.Summary,
            project.Description,
            project.ImageUrl,
            project.RepositoryUrl,
            project.LiveUrl,
            project.Technologies.Select(technology => technology.Name).ToArray());
}

public sealed record PublishedSkillStatement(Guid Id, string Text);

public sealed record PublishedSoftwareSkill(Guid Id, string Name, string IconClassName);

public sealed record PublishedSkillsResponse(
    IReadOnlyCollection<PublishedSkillStatement> Statements,
    IReadOnlyCollection<PublishedSoftwareSkill> SoftwareSkills);

public sealed record PublishedEducationResponse(
    Guid Id,
    string SchoolName,
    string Degree,
    string Duration,
    string? Description,
    string? LogoUrl,
    IReadOnlyCollection<string> DescriptionBullets)
{
    internal static PublishedEducationResponse From(EducationEntry entry) =>
        new(
            entry.Id,
            entry.SchoolName,
            entry.Degree,
            entry.Duration,
            entry.Description,
            entry.LogoUrl,
            entry.DescriptionBullets
                .OrderBy(bullet => bullet.SortOrder)
                .Select(bullet => bullet.Text)
                .ToArray());
}

public sealed record PublishedWorkExperienceResponse(
    Guid Id,
    string Role,
    string Company,
    string Date,
    string? Description,
    string? CompanyLogoUrl,
    IReadOnlyCollection<string> DescriptionBullets)
{
    internal static PublishedWorkExperienceResponse From(WorkExperienceEntry entry) =>
        new(
            entry.Id,
            entry.Role,
            entry.Company,
            entry.Date,
            entry.Description,
            entry.CompanyLogoUrl,
            entry.DescriptionBullets
                .OrderBy(bullet => bullet.SortOrder)
                .Select(bullet => bullet.Text)
                .ToArray());
}

public sealed record LandingPageResponse(
    PortfolioSettingsResponse Settings,
    IReadOnlyCollection<PublishedProjectResponse> Projects,
    PublishedSkillsResponse Skills,
    IReadOnlyCollection<PublishedEducationResponse> Educations,
    IReadOnlyCollection<PublishedWorkExperienceResponse> WorkExperiences);
