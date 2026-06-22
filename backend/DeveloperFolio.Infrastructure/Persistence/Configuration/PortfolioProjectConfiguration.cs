using DeveloperFolio.Domain.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class PortfolioProjectConfiguration : EntityConfiguration<PortfolioProject>
{
    public override void Configure(EntityTypeBuilder<PortfolioProject> builder)
    {
        base.Configure(builder);

        builder.ToTable("Projects");
        builder.Property(project => project.Title).HasMaxLength(160).IsRequired();
        builder.Property(project => project.Summary).HasMaxLength(500).IsRequired();
        builder.Property(project => project.Description).HasMaxLength(5000);
        builder.Property(project => project.ImageUrl).HasMaxLength(2048);
        builder.Property(project => project.RepositoryUrl).HasMaxLength(2048);
        builder.Property(project => project.LiveUrl).HasMaxLength(2048);
        builder.Property(project => project.SortOrder).IsRequired();
        builder.Property(project => project.IsPublished).IsRequired();

        builder.HasMany(project => project.Technologies)
            .WithOne()
            .HasForeignKey(technology => technology.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(project => new { project.IsPublished, project.SortOrder });
    }
}
