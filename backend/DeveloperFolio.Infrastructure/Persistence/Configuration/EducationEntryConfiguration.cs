using DeveloperFolio.Domain.Education;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class EducationEntryConfiguration : EntityConfiguration<EducationEntry>
{
    public override void Configure(EntityTypeBuilder<EducationEntry> builder)
    {
        base.Configure(builder);

        builder.ToTable("EducationEntries");
        builder.Property(entry => entry.SchoolName).HasMaxLength(200).IsRequired();
        builder.Property(entry => entry.Degree).HasMaxLength(200).IsRequired();
        builder.Property(entry => entry.Duration).HasMaxLength(120).IsRequired();
        builder.Property(entry => entry.Description).HasMaxLength(2000);
        builder.Property(entry => entry.LogoUrl).HasMaxLength(2048);
        builder.Property(entry => entry.SortOrder).IsRequired();
        builder.Property(entry => entry.IsPublished).IsRequired();

        builder.HasMany(entry => entry.DescriptionBullets)
            .WithOne()
            .HasForeignKey(bullet => bullet.EducationEntryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(entry => new { entry.IsPublished, entry.SortOrder });
    }
}
