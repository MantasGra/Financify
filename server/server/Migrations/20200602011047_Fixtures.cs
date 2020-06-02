using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class Fixtures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmailTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(nullable: false),
                    Title = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(maxLength: 255, nullable: false),
                    Fullname = table.Column<string>(maxLength: 255, nullable: false),
                    Password = table.Column<string>(maxLength: 255, nullable: false),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    Type = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Accounts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Budgets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<double>(nullable: false),
                    Category = table.Column<int>(nullable: false),
                    DateFrom = table.Column<DateTime>(nullable: false),
                    DateTo = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Budgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Budgets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BugReports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BugReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BugReports_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CurrencySubscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Currency = table.Column<string>(maxLength: 10, nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrencySubscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CurrencySubscriptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    Category = table.Column<int>(nullable: false),
                    AccountId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<double>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Category = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 255, nullable: true),
                    Disabled = table.Column<bool>(nullable: false),
                    AccountId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Responses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    CustomerSupportId = table.Column<int>(nullable: false),
                    BugReportId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Responses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Responses_BugReports_BugReportId",
                        column: x => x.BugReportId,
                        principalTable: "BugReports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Responses_Users_CustomerSupportId",
                        column: x => x.CustomerSupportId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "EmailTemplates",
                columns: new[] { "Id", "Content", "Title" },
                values: new object[] { 1, "We are informing you about a good currency price which you are subscribing - {0}. Its price now is equal to {1} compared to 1 USD.", "Good currency price" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Discriminator", "Email", "Fullname", "Password", "RegistrationDate" },
                values: new object[,]
                {
                    { 1, "User", "admin@financify.net", "Admin Financify", "123456789", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, "User", "StephanieTMacha@armyspy.com", "Stephanie T. Macha", "123456789", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 3, "User", "DavidDReed@rhyta.com", "David D. Reed", "123456789", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Accounts",
                columns: new[] { "Id", "Name", "Type", "UserId" },
                values: new object[,]
                {
                    { 1, "Cash", 0, 1 },
                    { 2, "Main", 1, 1 },
                    { 3, "Cash", 0, 2 },
                    { 4, "Default", 0, 3 }
                });

            migrationBuilder.InsertData(
                table: "Budgets",
                columns: new[] { "Id", "Amount", "Category", "DateFrom", "DateTo", "Status", "UserId" },
                values: new object[,]
                {
                    { 1, 1250.3099999999999, 6, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), new DateTime(2020, 6, 2, 4, 10, 46, 856, DateTimeKind.Local).AddTicks(491), 0, 1 },
                    { 2, 25.609999999999999, 8, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), new DateTime(2020, 6, 2, 4, 10, 46, 856, DateTimeKind.Local).AddTicks(1467), 2, 1 },
                    { 3, 400.69, 5, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), new DateTime(2020, 6, 2, 4, 10, 46, 856, DateTimeKind.Local).AddTicks(1498), 4, 1 },
                    { 4, 138.50999999999999, 1, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), new DateTime(2020, 6, 2, 4, 10, 46, 856, DateTimeKind.Local).AddTicks(1502), 1, 1 }
                });

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

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "Id", "AccountId", "Amount", "Category", "Date", "Description", "Disabled" },
                values: new object[,]
                {
                    { 1, 1, 125.31, 6, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), "Some description", false },
                    { 2, 1, 13.99, 8, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), null, false },
                    { 3, 1, 4.6500000000000004, 0, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), "McDonalds", true },
                    { 5, 1, 15.31, 6, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), "Some description", false },
                    { 6, 1, 12.31, 6, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), "Some description", false },
                    { 7, 1, 25.309999999999999, 6, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), "Some description", false },
                    { 8, 1, 45.310000000000002, 6, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), "Some description", false },
                    { 9, 1, 16.309999999999999, 6, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), "Some description", false },
                    { 10, 1, 115.31, 6, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), "Some description", false },
                    { 4, 3, 87.439999999999998, 7, new DateTime(2020, 5, 2, 4, 10, 46, 853, DateTimeKind.Local).AddTicks(5780), null, false }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Budgets_UserId",
                table: "Budgets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_BugReports_UserId",
                table: "BugReports",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CurrencySubscriptions_UserId",
                table: "CurrencySubscriptions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_BugReportId",
                table: "Responses",
                column: "BugReportId");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_CustomerSupportId",
                table: "Responses",
                column: "CustomerSupportId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_AccountId",
                table: "Subscriptions",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_AccountId",
                table: "Transactions",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Budgets");

            migrationBuilder.DropTable(
                name: "CurrencySubscriptions");

            migrationBuilder.DropTable(
                name: "EmailTemplates");

            migrationBuilder.DropTable(
                name: "Responses");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "BugReports");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
