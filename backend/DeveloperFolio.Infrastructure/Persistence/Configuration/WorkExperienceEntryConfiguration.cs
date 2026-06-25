using DeveloperFolio.Domain.WorkExperience;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class WorkExperienceEntryConfiguration : EntityConfiguration<WorkExperienceEntry>
{
    public override void Configure(EntityTypeBuilder<WorkExperienceEntry> builder)
    {
        base.Configure(builder);

        builder.ToTable("WorkExperienceEntries");
        builder.Property(entry => entry.Role).HasMaxLength(200).IsRequired();
        builder.Property(entry => entry.Company).HasMaxLength(200).IsRequired();
        builder.Property(entry => entry.Date).HasMaxLength(120).IsRequired();
        builder.Property(entry => entry.Description).HasMaxLength(2000);
        builder.Property(entry => entry.CompanyLogoUrl).HasMaxLength(2048);
        builder.Property(entry => entry.SortOrder).IsRequired();
        builder.Property(entry => entry.IsPublished).IsRequired();

        builder.HasMany(entry => entry.DescriptionBullets)
            .WithOne()
            .HasForeignKey(bullet => bullet.WorkExperienceEntryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(entry => new { entry.IsPublished, entry.SortOrder });
    }
}
