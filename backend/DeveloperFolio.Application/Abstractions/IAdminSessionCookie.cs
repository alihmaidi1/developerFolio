namespace DeveloperFolio.Application.Abstractions;

public interface IAdminSessionCookie
{
    void Set(string accessToken);
    void Clear();
}
