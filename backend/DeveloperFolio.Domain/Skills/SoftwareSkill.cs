using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Skills;

public sealed class SoftwareSkill : Entity
{
    private SoftwareSkill()
    {
    }

    private SoftwareSkill(string name, string iconClassName, int sortOrder, bool isPublished)
    {
        ApplyDetails(name, iconClassName, sortOrder, isPublished);
    }

    public string Name { get; private set; } = string.Empty;
    public string IconClassName { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }
    public bool IsPublished { get; private set; }

    public static SoftwareSkill Create(
        string name,
        string iconClassName,
        int sortOrder,
        bool isPublished) =>
        new(name, iconClassName, sortOrder, isPublished);

    public void Update(string name, string iconClassName, bool isPublished)
    {
        ApplyDetails(name, iconClassName, SortOrder, isPublished);
        Touch();
    }

    public void SetSortOrder(int sortOrder)
    {
        SortOrder = sortOrder;
        Touch();
    }

    private void ApplyDetails(string name, string iconClassName, int sortOrder, bool isPublished)
    {
        Name = name.Trim();
        IconClassName = iconClassName.Trim();
        SortOrder = sortOrder;
        IsPublished = isPublished;
    }
}
