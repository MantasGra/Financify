using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class Fixtures__CurrencySubscriptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "CurrencySubscriptions",
                columns: new[] { "Id", "Currency", "UserId" },
                values: new object[,]
                {
                    { 1, "USD", 1 },
                    { 2, "EUR", 1 },
                    { 3, "GBP", 2 },
                    { 4, "EUR", 3 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CurrencySubscriptions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CurrencySubscriptions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "CurrencySubscriptions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "CurrencySubscriptions",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
