using DeveloperFolio.Domain.Security;

namespace DeveloperFolio.Application.Abstractions;

public interface IJwtTokenService
{
    string Create(AdminUser adminUser);
}
