using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public enum SubscriptionType
    {
        Weekly,
        Monthly,
        Yearly
    }

    public class Subscription
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Amount { get; set; }
        public DateTime StartDate { get; set; }
        public SubscriptionType? Type { get; set; }
        public TransactionCategory? Category { get; set; }

        public virtual Account Account { get; set; }
    }
}
