﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Models;

namespace server.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("server.Models.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4")
                        .HasMaxLength(255);

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Accounts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Cash",
                            Type = 0,
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            Name = "Main",
                            Type = 1,
                            UserId = 1
                        },
                        new
                        {
                            Id = 3,
                            Name = "Cash",
                            Type = 0,
                            UserId = 2
                        },
                        new
                        {
                            Id = 4,
                            Name = "Default",
                            Type = 0,
                            UserId = 3
                        });
                });

            modelBuilder.Entity("server.Models.Budget", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Amount")
                        .HasColumnType("double");

                    b.Property<int>("Category")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateFrom")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("DateTo")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Budgets");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Amount = 1250.3099999999999,
                            Category = 6,
                            DateFrom = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = 0,
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            Amount = 25.609999999999999,
                            Category = 8,
                            DateFrom = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = 2,
                            UserId = 1
                        },
                        new
                        {
                            Id = 3,
                            Amount = 400.69,
                            Category = 5,
                            DateFrom = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = 4,
                            UserId = 1
                        },
                        new
                        {
                            Id = 4,
                            Amount = 138.50999999999999,
                            Category = 1,
                            DateFrom = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DateTo = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = 1,
                            UserId = 1
                        });
                });

            modelBuilder.Entity("server.Models.BugReport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("BugReports");
                });

            modelBuilder.Entity("server.Models.CurrencySubscription", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Currency")
                        .IsRequired()
                        .HasColumnType("varchar(10) CHARACTER SET utf8mb4")
                        .HasMaxLength(10);

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("CurrencySubscriptions");
                });

            modelBuilder.Entity("server.Models.EmailTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("EmailTemplates");
                });

            modelBuilder.Entity("server.Models.Response", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("BugReportId")
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("CustomerSupportId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BugReportId");

                    b.HasIndex("CustomerSupportId");

                    b.ToTable("Responses");
                });

            modelBuilder.Entity("server.Models.Subscription", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<double>("Amount")
                        .HasColumnType("double");

                    b.Property<int>("Category")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4")
                        .HasMaxLength(255);

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("Subscriptions");
                });

            modelBuilder.Entity("server.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<double>("Amount")
                        .HasColumnType("double");

                    b.Property<int>("Category")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4")
                        .HasMaxLength(255);

                    b.Property<bool>("Disabled")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.ToTable("Transactions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AccountId = 1,
                            Amount = 125.31,
                            Category = 6,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Description = "Some description",
                            Disabled = false
                        },
                        new
                        {
                            Id = 2,
                            AccountId = 1,
                            Amount = 13.99,
                            Category = 8,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Disabled = false
                        },
                        new
                        {
                            Id = 3,
                            AccountId = 1,
                            Amount = 4.6500000000000004,
                            Category = 0,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Description = "McDonalds",
                            Disabled = true
                        },
                        new
                        {
                            Id = 4,
                            AccountId = 3,
                            Amount = 87.439999999999998,
                            Category = 7,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Disabled = false
                        },
                        new
                        {
                            Id = 5,
                            AccountId = 1,
                            Amount = 15.31,
                            Category = 6,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Description = "Some description",
                            Disabled = false
                        },
                        new
                        {
                            Id = 6,
                            AccountId = 1,
                            Amount = 12.31,
                            Category = 6,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Description = "Some description",
                            Disabled = false
                        },
                        new
                        {
                            Id = 7,
                            AccountId = 1,
                            Amount = 25.309999999999999,
                            Category = 6,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Description = "Some description",
                            Disabled = false
                        },
                        new
                        {
                            Id = 8,
                            AccountId = 1,
                            Amount = 45.310000000000002,
                            Category = 6,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Description = "Some description",
                            Disabled = false
                        },
                        new
                        {
                            Id = 9,
                            AccountId = 1,
                            Amount = 16.309999999999999,
                            Category = 6,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Description = "Some description",
                            Disabled = false
                        },
                        new
                        {
                            Id = 10,
                            AccountId = 1,
                            Amount = 115.31,
                            Category = 6,
                            Date = new DateTime(2020, 4, 30, 15, 6, 50, 179, DateTimeKind.Local).AddTicks(1144),
                            Description = "Some description",
                            Disabled = false
                        });
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4")
                        .HasMaxLength(255);

                    b.Property<string>("Fullname")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4")
                        .HasMaxLength(255);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4")
                        .HasMaxLength(255);

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("User");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "admin@financify.net",
                            Fullname = "Admin Financify",
                            Password = "123456789",
                            RegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 2,
                            Email = "StephanieTMacha@armyspy.com",
                            Fullname = "Stephanie T. Macha",
                            Password = "123456789",
                            RegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 3,
                            Email = "DavidDReed@rhyta.com",
                            Fullname = "David D. Reed",
                            Password = "123456789",
                            RegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("server.Models.CustomerSupport", b =>
                {
                    b.HasBaseType("server.Models.User");

                    b.HasDiscriminator().HasValue("CustomerSupport");
                });

            modelBuilder.Entity("server.Models.Account", b =>
                {
                    b.HasOne("server.Models.User", "User")
                        .WithMany("Accounts")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.Budget", b =>
                {
                    b.HasOne("server.Models.User", "User")
                        .WithMany("Budgets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.BugReport", b =>
                {
                    b.HasOne("server.Models.User", "User")
                        .WithMany("BugReports")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.CurrencySubscription", b =>
                {
                    b.HasOne("server.Models.User", "User")
                        .WithMany("CurrencySubscriptions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.Response", b =>
                {
                    b.HasOne("server.Models.BugReport", "BugReport")
                        .WithMany("Responses")
                        .HasForeignKey("BugReportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.CustomerSupport", "CustomerSupport")
                        .WithMany("Responses")
                        .HasForeignKey("CustomerSupportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.Subscription", b =>
                {
                    b.HasOne("server.Models.Account", "Account")
                        .WithMany("Subscriptions")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.Transaction", b =>
                {
                    b.HasOne("server.Models.Account", "Account")
                        .WithMany("Transactions")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
