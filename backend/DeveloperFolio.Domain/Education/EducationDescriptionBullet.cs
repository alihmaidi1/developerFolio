using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Education;

public sealed class EducationDescriptionBullet : Entity
{
    private EducationDescriptionBullet()
    {
    }

    private EducationDescriptionBullet(Guid educationEntryId, string text, int sortOrder)
    {
        EducationEntryId = educationEntryId;
        Text = text;
        SortOrder = sortOrder;
    }

    public Guid EducationEntryId { get; private set; }
    public string Text { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }

    internal static EducationDescriptionBullet Create(Guid educationEntryId, string text, int sortOrder) =>
        new(educationEntryId, text, sortOrder);
}
