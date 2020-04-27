using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql;

namespace server.Models
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<BugReport> BugReports { get; set; }
        public DbSet<CurrencySubscription> CurrencySubscriptions { get; set; }
        public DbSet<CustomerSupport> CustomerSupports { get; set; }
        public DbSet<EmailTemplate> EmailTemplates { get; set; }
        public DbSet<Response> Responses { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("Server=localhost;Database=financify;User=root;Password=");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Email = "admin@financify.net", Fullname = "Admin Financify", Password = "123456789", RegistrationDate = new DateTime() },
                new User { Id = 2, Email = "StephanieTMacha@armyspy.com", Fullname = "Stephanie T. Macha", Password = "123456789", RegistrationDate = new DateTime() },
                new User { Id = 3, Email = "DavidDReed@rhyta.com", Fullname = "David D. Reed", Password = "123456789", RegistrationDate = new DateTime() }
            );

            modelBuilder.Entity<Account>().HasData(
                new { Id = 1, Name = "Cash", Type = AccountType.Cash, UserId = 1 },
                new { Id = 2, Name = "Main", Type = AccountType.CreditCard, UserId = 1 },
                new { Id = 3, Name = "Cash", Type = AccountType.Cash, UserId = 2 },
                new { Id = 4, Name = "Default", Type = AccountType.Cash, UserId = 3 }
            );
        }
    }
}
