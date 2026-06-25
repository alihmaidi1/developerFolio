using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.WorkExperience;

public sealed class WorkExperienceDescriptionBullet : Entity
{
    private WorkExperienceDescriptionBullet()
    {
    }

    private WorkExperienceDescriptionBullet(Guid workExperienceEntryId, string text, int sortOrder)
    {
        WorkExperienceEntryId = workExperienceEntryId;
        Text = text;
        SortOrder = sortOrder;
    }

    public Guid WorkExperienceEntryId { get; private set; }
    public string Text { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }

    internal static WorkExperienceDescriptionBullet Create(
        Guid workExperienceEntryId,
        string text,
        int sortOrder) =>
        new(workExperienceEntryId, text, sortOrder);
}
