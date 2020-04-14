using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public enum AccountType
    {
        Cash,
        CreditCard,
        EWallet
    }

    public class Account
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        public AccountType Type { get; set; }

        [Required]
        public virtual User User { get; set; }

        public virtual ICollection<Subscription> Subscriptions { get; set; }

        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
