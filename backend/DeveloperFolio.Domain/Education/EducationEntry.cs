using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Education;

public sealed class EducationEntry : Entity
{
    private readonly List<EducationDescriptionBullet> _descriptionBullets = [];

    private EducationEntry()
    {
    }

    private EducationEntry(
        string schoolName,
        string degree,
        string duration,
        string? description,
        string? logoUrl,
        IEnumerable<string> descriptionBullets,
        int sortOrder,
        bool isPublished)
    {
        ApplyDetails(
            schoolName,
            degree,
            duration,
            description,
            logoUrl,
            descriptionBullets,
            sortOrder,
            isPublished);
    }

    public string SchoolName { get; private set; } = string.Empty;
    public string Degree { get; private set; } = string.Empty;
    public string Duration { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public string? LogoUrl { get; private set; }
    public int SortOrder { get; private set; }
    public bool IsPublished { get; private set; }
    public IReadOnlyCollection<EducationDescriptionBullet> DescriptionBullets => _descriptionBullets;

    public static EducationEntry Create(
        string schoolName,
        string degree,
        string duration,
        string? description,
        string? logoUrl,
        IEnumerable<string> descriptionBullets,
        int sortOrder,
        bool isPublished) =>
        new(
            schoolName,
            degree,
            duration,
            description,
            logoUrl,
            descriptionBullets,
            sortOrder,
            isPublished);

    public void Update(
        string schoolName,
        string degree,
        string duration,
        string? description,
        string? logoUrl,
        IEnumerable<string> descriptionBullets,
        bool isPublished)
    {
        ApplyDetails(
            schoolName,
            degree,
            duration,
            description,
            logoUrl,
            descriptionBullets,
            SortOrder,
            isPublished);

        Touch();
    }

    public void SetSortOrder(int sortOrder)
    {
        SortOrder = sortOrder;
        Touch();
    }

    private void ApplyDetails(
        string schoolName,
        string degree,
        string duration,
        string? description,
        string? logoUrl,
        IEnumerable<string> descriptionBullets,
        int sortOrder,
        bool isPublished)
    {
        SchoolName = schoolName.Trim();
        Degree = degree.Trim();
        Duration = duration.Trim();
        Description = NormalizeOptional(description);
        LogoUrl = NormalizeOptional(logoUrl);
        SortOrder = sortOrder;
        IsPublished = isPublished;

        _descriptionBullets.Clear();
        _descriptionBullets.AddRange(
            descriptionBullets
                .Select(text => text.Trim())
                .Where(text => text.Length > 0)
                .Select((text, index) => EducationDescriptionBullet.Create(Id, text, index)));
    }

    private static string? NormalizeOptional(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
