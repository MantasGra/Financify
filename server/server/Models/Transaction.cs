using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public enum TransactionCategory
    {
        Food = "Food",
        Shopping = "Shopping",
        Travel = "Travel",
        Savings = "Savings",
        Transport = "Transport",
        Salary = "Salary",
        Bills = "Bills",
        Fuel = "Fuel",
        Gifts = "Gifts",
        Holidays = "Holidays",
        Other = "Other"
    }

    public class Transaction
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public TransactionCategory? Category { get; set;}
        public string Description { get; set; }
        public bool Disabled { get; set; }

        public virtual Account Account { get; set; }
    }
}
