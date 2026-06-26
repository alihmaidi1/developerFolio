using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DeveloperFolio.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class edit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IntroVideoUrl",
                table: "GreetingSettings",
                type: "character varying(2048)",
                maxLength: 2048,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IntroVideoUrl",
                table: "GreetingSettings");
        }
    }
}
