using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class EmailTemplateFixture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "EmailTemplates",
                columns: new[] { "Id", "Content", "Title" },
                values: new object[] { 1, "We are informing you about a good currency price which you are subscribing - {0}. Its price now is equal to {1} compared to 1 USD.", "Good currency price" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Email",
                value: "lanac91245@dfb55.com");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "EmailTemplates",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Email",
                value: "DavidDReed@rhyta.com");
        }
    }
}
