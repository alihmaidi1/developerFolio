using FluentValidation;

namespace DeveloperFolio.Application.Features.Auth.Login;

internal sealed class LoginValidation : AbstractValidator<LoginCommand>
{
    public LoginValidation()
    {
        RuleFor(command => command.Email).NotEmpty().EmailAddress();
        RuleFor(command => command.Password).NotEmpty();
    }
}
