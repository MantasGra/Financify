using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public double Amount { get; set; }
        public TransactionCategory? Category { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public BudgetStatus Status { get; set; }

        public virtual User User { get; set; }
    }
}
