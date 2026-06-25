using DeveloperFolio.Domain.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class ContactSettingsConfiguration : EntityConfiguration<ContactSettings>
{
    public override void Configure(EntityTypeBuilder<ContactSettings> builder)
    {
        base.Configure(builder);

        builder.ToTable("ContactSettings");
        builder.Property(contact => contact.Title).HasMaxLength(200).IsRequired();
        builder.Property(contact => contact.Subtitle).HasMaxLength(1000).IsRequired();
        builder.Property(contact => contact.Email).HasMaxLength(200);
        builder.Property(contact => contact.Phone).HasMaxLength(80);
        builder.Property(contact => contact.Address).HasMaxLength(300);
    }
}
