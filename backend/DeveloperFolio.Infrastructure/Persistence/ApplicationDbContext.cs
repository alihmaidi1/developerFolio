using DeveloperFolio.Application.Abstractions;
using DeveloperFolio.Domain.Common;
using DeveloperFolio.Domain.Projects;
using DeveloperFolio.Domain.Resume;
using DeveloperFolio.Domain.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : DbContext(options), IApplicationDbContext
{
    public DbSet<PortfolioProject> Projects => Set<PortfolioProject>();
    public DbSet<ResumeDocument> ResumeDocuments => Set<ResumeDocument>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}

internal abstract class EntityConfiguration<TEntity> : IEntityTypeConfiguration<TEntity>
    where TEntity : Entity
{
    public virtual void Configure(EntityTypeBuilder<TEntity> builder)
    {
        builder.HasKey(entity => entity.Id);
        builder.Property(entity => entity.Id).ValueGeneratedNever();
        builder.Property(entity => entity.CreatedAtUtc).IsRequired();
        builder.Property(entity => entity.UpdatedAtUtc).IsRequired();
    }
}

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
        builder.HasIndex(project => new { project.IsPublished, project.SortOrder });
        builder.HasMany(project => project.Technologies)
            .WithOne()
            .HasForeignKey(technology => technology.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);
        builder.Navigation(project => project.Technologies).UsePropertyAccessMode(PropertyAccessMode.Field);
    }
}

internal sealed class ProjectTechnologyConfiguration : IEntityTypeConfiguration<ProjectTechnology>
{
    public void Configure(EntityTypeBuilder<ProjectTechnology> builder)
    {
        builder.ToTable("ProjectTechnologies");
        builder.HasKey(technology => technology.Id);
        builder.Property(technology => technology.Id).ValueGeneratedNever();
        builder.Property(technology => technology.Name).HasMaxLength(80).IsRequired();
        builder.HasIndex(technology => new { technology.ProjectId, technology.Name }).IsUnique();
    }
}

internal sealed class ResumeDocumentConfiguration : EntityConfiguration<ResumeDocument>
{
    public override void Configure(EntityTypeBuilder<ResumeDocument> builder)
    {
        base.Configure(builder);
        builder.ToTable("ResumeDocuments");
        builder.Property(document => document.FileName).HasMaxLength(255).IsRequired();
        builder.Property(document => document.ContentType).HasMaxLength(100).IsRequired();
        builder.Property(document => document.StorageKey).HasMaxLength(500).IsRequired();
    }
}

internal sealed class AdminUserConfiguration : EntityConfiguration<AdminUser>
{
    public override void Configure(EntityTypeBuilder<AdminUser> builder)
    {
        base.Configure(builder);
        builder.ToTable("AdminUsers");
        builder.Property(user => user.Email).HasMaxLength(320).IsRequired();
        builder.Property(user => user.PasswordHash).HasMaxLength(500).IsRequired();
        builder.HasIndex(user => user.Email).IsUnique();
    }
}
