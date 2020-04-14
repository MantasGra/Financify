using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Fullname { get; set; }
        public string Password { get; set; }
        public DateTime RegistrationDate { get; set; }

        public virtual ICollection<CurrencySubscription> CurrencySubscriptions { get; set; }
        public virtual ICollection<BugReport> BugReports { get; set; }
        public virtual ICollection<Account> Accounts { get; set; }
        public virtual ICollection<Budget> Budgets { get; set; }
    }
}
