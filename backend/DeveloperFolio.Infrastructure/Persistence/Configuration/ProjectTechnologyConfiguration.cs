using DeveloperFolio.Domain.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DeveloperFolio.Infrastructure.Persistence.Configuration;

internal sealed class ProjectTechnologyConfiguration : EntityConfiguration<ProjectTechnology>
{
    public override void Configure(EntityTypeBuilder<ProjectTechnology> builder)
    {
        base.Configure(builder);

        builder.ToTable("ProjectTechnologies");
        builder.Property(technology => technology.Name).HasMaxLength(80).IsRequired();
        builder.HasIndex(technology => new { technology.ProjectId, technology.Name }).IsUnique();
    }
}
