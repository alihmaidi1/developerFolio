using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Skills;

public sealed class SkillStatement : Entity
{
    private SkillStatement()
    {
    }

    private SkillStatement(string text, int sortOrder, bool isPublished)
    {
        ApplyDetails(text, sortOrder, isPublished);
    }

    public string Text { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }
    public bool IsPublished { get; private set; }

    public static SkillStatement Create(string text, int sortOrder, bool isPublished) =>
        new(text, sortOrder, isPublished);

    public void Update(string text, bool isPublished)
    {
        ApplyDetails(text, SortOrder, isPublished);
        Touch();
    }

    public void SetSortOrder(int sortOrder)
    {
        SortOrder = sortOrder;
        Touch();
    }

    private void ApplyDetails(string text, int sortOrder, bool isPublished)
    {
        Text = text.Trim();
        SortOrder = sortOrder;
        IsPublished = isPublished;
    }
}
