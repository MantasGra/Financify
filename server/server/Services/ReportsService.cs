using System.Collections.Generic;
using server.Models;
using server.DTO;
using System;
using System.Linq;
using server.ResourceManagers;

namespace server.Services
{
    public class ReportsService : IReportsService
    {
        private ITransactionManager _manager;

        public ReportsService(ITransactionManager manager)
        {
            _manager = manager;
        }

        public List<MonthlyExpensesDto> FormMonthlyExpensesReport(int userId)
        {
            IQueryable<Transaction> transactions = _manager.GetMonthlyTransactions(userId, 12);
            List<MonthlyExpensesDto> expenses = new List<MonthlyExpensesDto>();
            for (int i = 12; i >= 1; i--)
            {
                DateTime month = DateTime.UtcNow.AddMonths(-i).AddDays(-DateTime.UtcNow.AddMonths(-i).Day + 1);
                double sum = -transactions.Where(t => t.Amount < 0 && t.Date >= month && t.Date < month.AddMonths(1)).Sum(t => t.Amount);
                expenses.Add(new MonthlyExpensesDto(sum, $"{month.Year}-{(month.Month < 10 ? $"0{month.Month}" : month.Month.ToString())}"));
            }
            return expenses;
        }
    }
}