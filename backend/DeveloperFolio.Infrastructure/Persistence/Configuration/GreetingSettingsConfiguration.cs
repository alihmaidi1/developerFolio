using DeveloperFolio.Domain.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class GreetingSettingsConfiguration : EntityConfiguration<GreetingSettings>
{
    public override void Configure(EntityTypeBuilder<GreetingSettings> builder)
    {
        base.Configure(builder);

        builder.ToTable("GreetingSettings");
        builder.Property(greeting => greeting.Username).HasMaxLength(120).IsRequired();
        builder.Property(greeting => greeting.Title).HasMaxLength(200).IsRequired();
        builder.Property(greeting => greeting.SubTitle).HasMaxLength(2000).IsRequired();
        builder.Property(greeting => greeting.ResumeUrl).HasMaxLength(2048);
        builder.Property(greeting => greeting.IntroVideoUrl).HasMaxLength(2048);
        builder.Property(greeting => greeting.DisplayGreeting).IsRequired();
    }
}
