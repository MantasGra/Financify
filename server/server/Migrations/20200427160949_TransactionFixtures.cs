using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class TransactionFixtures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "Id", "AccountId", "Amount", "Category", "Date", "Description", "Disabled" },
                values: new object[,]
                {
                    { 1, 1, 125.31, 6, DateTime.UtcNow, "Some description", false },
                    { 2, 1, 13.99, 8, DateTime.UtcNow, null, false },
                    { 3, 1, 4.65, 0, DateTime.UtcNow, "McDonalds", true },
                    { 4, 3, 87.43, 7, DateTime.UtcNow, null, false }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Transactions",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
