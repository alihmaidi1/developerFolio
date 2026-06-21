using System.ComponentModel.DataAnnotations;

namespace DeveloperFolio.Infrastructure.Options;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    [Required]
    public string Issuer { get; init; } = string.Empty;
    [Required]
    public string Audience { get; init; } = string.Empty;
    [Required, MinLength(32)]
    public string Key { get; init; } = string.Empty;
    [Range(5, 1440)]
    public int ExpirationMinutes { get; init; } = 60;
}

public sealed class StorageOptions
{
    public const string SectionName = "Storage";

    [Required]
    public string RootPath { get; init; } = "App_Data/uploads";
}

public sealed class AdminSeedOptions
{
    public const string SectionName = "AdminSeed";

    [Required, EmailAddress]
    public string Email { get; init; } = string.Empty;
    [Required, MinLength(10)]
    public string Password { get; init; } = string.Empty;
}
