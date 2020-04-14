using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

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

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }

        [Required]
        public SubscriptionType Type { get; set; }

        [Required]
        public TransactionCategory Category { get; set; }

        [Required]
        public virtual Account Account { get; set; }
    }
}
