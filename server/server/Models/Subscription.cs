using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public enum SubscriptionType
    {
        Weekly,
        Monthly,
        Yearly
    }

    public class Subscription : Model
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime StartDate { get; set; }

        [Required]
        public SubscriptionType Type { get; set; }

        [Required]
        public TransactionCategory Category { get; set; }

        [Required]
        public int AccountId { get; set; }

        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }
    }
}
