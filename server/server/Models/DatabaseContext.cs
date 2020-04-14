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
            optionsBuilder.UseMySql("Server=localhost;Database=financify;User=root;Password=root;");
        }
    }
}
