using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.Security;
using DeveloperFolio.Infrastructure.Options;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DeveloperFolio.Infrastructure.Security;

internal sealed class JwtTokenService(IOptions<JwtOptions> options) : IJwtTokenService
{
    private readonly JwtOptions _options = options.Value;

    public string Create(AdminUser adminUser)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, adminUser.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, adminUser.Email),
            new Claim(ClaimTypes.Role, "Admin"),
        };
        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key)),
            SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            _options.Issuer,
            _options.Audience,
            claims,
            expires: DateTime.UtcNow.AddMinutes(_options.ExpirationMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
