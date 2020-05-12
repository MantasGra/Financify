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
                    { 1, 1, 125.31, 6, DateTime.Now, "Some description", false },
                    { 2, 1, 13.99, 8, DateTime.Now, null, false },
                    { 3, 1, 4.65, 0, DateTime.Now, "McDonalds", true },
                    { 4, 3, 87.43, 7, DateTime.Now, null, false }
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
