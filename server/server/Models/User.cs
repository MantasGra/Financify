using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class User : AModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Fullname { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime RegistrationDate { get; set; }

        public virtual ICollection<CurrencySubscription> CurrencySubscriptions { get; set; }

        public virtual ICollection<BugReport> BugReports { get; set; }

        public virtual ICollection<Account> Accounts { get; set; }

        public virtual ICollection<Budget> Budgets { get; set; }
    }
}
