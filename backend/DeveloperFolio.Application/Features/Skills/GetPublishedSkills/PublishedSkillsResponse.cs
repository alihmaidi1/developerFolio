namespace DeveloperFolio.Application.Features.Skills.GetPublishedSkills;

public sealed record PublishedSkillStatement(Guid Id, string Text);

public sealed record PublishedSoftwareSkill(Guid Id, string Name, string IconClassName);

public sealed record PublishedSkillsResponse(
    IReadOnlyCollection<PublishedSkillStatement> Statements,
    IReadOnlyCollection<PublishedSoftwareSkill> SoftwareSkills);
