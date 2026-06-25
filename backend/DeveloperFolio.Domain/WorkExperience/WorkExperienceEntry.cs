using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.WorkExperience;

public sealed class WorkExperienceEntry : Entity
{
    private readonly List<WorkExperienceDescriptionBullet> _descriptionBullets = [];

    private WorkExperienceEntry()
    {
    }

    private WorkExperienceEntry(
        string role,
        string company,
        string date,
        string? description,
        string? companyLogoUrl,
        IEnumerable<string> descriptionBullets,
        int sortOrder,
        bool isPublished)
    {
        ApplyDetails(
            role,
            company,
            date,
            description,
            companyLogoUrl,
            descriptionBullets,
            sortOrder,
            isPublished);
    }

    public string Role { get; private set; } = string.Empty;
    public string Company { get; private set; } = string.Empty;
    public string Date { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public string? CompanyLogoUrl { get; private set; }
    public int SortOrder { get; private set; }
    public bool IsPublished { get; private set; }
    public IReadOnlyCollection<WorkExperienceDescriptionBullet> DescriptionBullets => _descriptionBullets;

    public static WorkExperienceEntry Create(
        string role,
        string company,
        string date,
        string? description,
        string? companyLogoUrl,
        IEnumerable<string> descriptionBullets,
        int sortOrder,
        bool isPublished) =>
        new(
            role,
            company,
            date,
            description,
            companyLogoUrl,
            descriptionBullets,
            sortOrder,
            isPublished);

    public void Update(
        string role,
        string company,
        string date,
        string? description,
        string? companyLogoUrl,
        IEnumerable<string> descriptionBullets,
        bool isPublished)
    {
        ApplyDetails(
            role,
            company,
            date,
            description,
            companyLogoUrl,
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
        string role,
        string company,
        string date,
        string? description,
        string? companyLogoUrl,
        IEnumerable<string> descriptionBullets,
        int sortOrder,
        bool isPublished)
    {
        Role = role.Trim();
        Company = company.Trim();
        Date = date.Trim();
        Description = NormalizeOptional(description);
        CompanyLogoUrl = NormalizeOptional(companyLogoUrl);
        SortOrder = sortOrder;
        IsPublished = isPublished;

        _descriptionBullets.Clear();
        _descriptionBullets.AddRange(
            descriptionBullets
                .Select(text => text.Trim())
                .Where(text => text.Length > 0)
                .Select((text, index) => WorkExperienceDescriptionBullet.Create(Id, text, index)));
    }

    private static string? NormalizeOptional(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
