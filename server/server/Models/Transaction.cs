using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public enum TransactionCategory
    {
        Food,
        Shopping,
        Travel,
        Savings,
        Transport,
        Salary,
        Bills,
        Fuel,
        Gifts,
        Holidays,
        Other
    }

    public class Transaction
    {
        public int Id { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Date { get; set; }

        [Required]
        public TransactionCategory Category { get; set;}

        [StringLength(255)]
        public string Description { get; set; }

        [Required]
        public bool Disabled { get; set; }

        [Required]
        public virtual Account Account { get; set; }
    }
}
