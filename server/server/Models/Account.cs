using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public enum AccountType
    {
        Cash = "Cash",
        CreditCard = "Credit card",
        EWallet = "E-Wallet"
    }

    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AccountType? Type { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Subscription> Subscriptions { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
