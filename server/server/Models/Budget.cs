using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public enum BudgetStatus
    {
        AlmostThere,
        AtThreshold,
        Under,
        Undefined,
        Over
    }

    public class Budget
    {
        public int Id { get; set; }

        [Required]
        public double Amount { get; set; }

        [Required]
        public TransactionCategory Category { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime DateFrom { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime DateTo { get; set; }

        [Required]
        public BudgetStatus Status { get; set; }

        [Required]
        public virtual User User { get; set; }
    }
}
