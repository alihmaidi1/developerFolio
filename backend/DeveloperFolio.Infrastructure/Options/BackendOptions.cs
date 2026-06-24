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
    public int ExpirationMinutes { get; init; } = 60;
}

public sealed class ImageStorageOptions
{
    public const string SectionName = "ImageStorage";

    [Range(1024, 50 * 1024 * 1024)]
    public long MaxFileSizeBytes { get; init; } = 5 * 1024 * 1024;

    [Required, MinLength(1)]
    public string[] AllowedContentTypes { get; init; } =
        ["image/png", "image/jpeg", "image/webp", "image/gif"];
}

public sealed class AuthCookieOptions
{
    public const string SectionName = "AuthCookie";

    [Required]
    public string Name { get; init; } = "developerfolio_admin";
}

public sealed class AdminSeedOptions
{
    public const string SectionName = "AdminSeed";

    [Required, EmailAddress]
    public string Email { get; init; } = string.Empty;
    [Required, MinLength(10)]
    public string Password { get; init; } = string.Empty;
}
