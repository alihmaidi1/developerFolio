using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Settings;

public sealed class SocialLink : Entity
{
    private SocialLink()
    {
    }

    private SocialLink(string name, string url, string iconClassName, int sortOrder, bool isPublished)
    {
        ApplyDetails(name, url, iconClassName, sortOrder, isPublished);
    }

    public string Name { get; private set; } = string.Empty;
    public string Url { get; private set; } = string.Empty;
    public string IconClassName { get; private set; } = string.Empty;
    public int SortOrder { get; private set; }
    public bool IsPublished { get; private set; }

    public static SocialLink Create(
        string name,
        string url,
        string iconClassName,
        int sortOrder,
        bool isPublished) =>
        new(name, url, iconClassName, sortOrder, isPublished);

    public void Update(string name, string url, string iconClassName, bool isPublished)
    {
        ApplyDetails(name, url, iconClassName, SortOrder, isPublished);
        Touch();
    }

    public void SetSortOrder(int sortOrder)
    {
        SortOrder = sortOrder;
        Touch();
    }

    private void ApplyDetails(
        string name,
        string url,
        string iconClassName,
        int sortOrder,
        bool isPublished)
    {
        Name = name.Trim();
        Url = url.Trim();
        IconClassName = iconClassName.Trim();
        SortOrder = sortOrder;
        IsPublished = isPublished;
    }
}
