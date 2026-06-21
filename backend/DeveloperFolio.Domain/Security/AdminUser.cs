using DeveloperFolio.Domain.Common;

namespace DeveloperFolio.Domain.Security;

public sealed class AdminUser : Entity
{
    private AdminUser()
    {
    }

    public string Email { get; private set; } = string.Empty;
    public string PasswordHash { get; private set; } = string.Empty;

    public static AdminUser Create(string email, string passwordHash) =>
        new()
        {
            Email = email.Trim().ToLowerInvariant(),
            PasswordHash = passwordHash,
        };
}
