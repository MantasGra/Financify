using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.DTO
{
    public class BudgetDto
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public double UsedAmount { get; set; }
        public TransactionCategory Category { get; set; }
        public BudgetStatus Status { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int UserId { get; set; }
    }
}
