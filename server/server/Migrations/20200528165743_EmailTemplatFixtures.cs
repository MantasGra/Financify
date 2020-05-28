using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class EmailTemplatFixtures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "EmailTemplates",
                columns: new[] { "Id", "Content", "Title" },
                values: new object[] { 1, "Eina sau kokia gera dabar zinok {0} kaina. Jos verte siuo metu {1} lyginant su doleriu.", "Gera kaina blemba. Tempk ja cia!" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "EmailTemplates",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
