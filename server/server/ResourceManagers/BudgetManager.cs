using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Services;
using server.DTO;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace server.ResourceManagers
{
    public class BudgetManager : IBudgetManager
    {
        private readonly IStorage<Budget> _budgetStorage;
        private readonly ITransactionManager _transactionManager;

        public BudgetManager(IStorage<Budget> budgetStorage, ITransactionManager transactionManager)
        {
            _budgetStorage = budgetStorage;
            _transactionManager = transactionManager;
        }
        public Budget GetBudget(int id) 
        {
            return _budgetStorage.getItem(id);
        }
        public Budget AddBudget(Budget budget) 
        {
            return _budgetStorage.createItem(budget);
        }
        public Budget UpdateBudget(Budget budget, string[] includes = null)
        {
            return _budgetStorage.updateItem(budget, includes);
        }
        public List<BudgetDto> GetBudgets(int ?userId)
        {
            List<BudgetDto> budgets = new List<BudgetDto>();
            foreach (var budget in _budgetStorage.getCollection())
            {
                budgets.Add(transformBudgetToDto(budget));
            }
            return budgets;
        }

        public BudgetDto transformBudgetToDto(Budget budget)
        {
            BudgetDto dto = new BudgetDto();
            dto.Id = budget.Id;
            dto.Amount = budget.Amount;
            dto.Category = budget.Category;
            dto.DateFrom = budget.DateFrom;
            dto.DateTo = budget.DateTo;
            dto.Status = budget.Status;
            dto.UserId = budget.UserId;
            var transactions = _transactionManager.GetTransactionsForBudget(budget);
            double sum = 0;
            foreach (Transaction transaction in transactions)
            {
                sum += transaction.Amount;
            }
            dto.UsedAmount = sum;
            return dto;
        }

        public void RecalculateBudgetStatus(TransactionCategory category, DateTime date)
        {
            var budgets = _budgetStorage.getCollectionAsTracking().Where(b => b.Category == category && b.DateFrom <= date && b.DateTo >= date);
            foreach (var budget in budgets)
            {
                budget.Status = GetBudgetStatus(budget);
            }
            _budgetStorage.SaveChanges();
        }

        public BudgetStatus GetBudgetStatus(Budget budget)
        {
            var budgetTransactions = _transactionManager.GetTransactionsForBudget(budget);
            var sumAmount = (from t in budgetTransactions select t.Amount).Sum();
            var percentage = sumAmount * 100 / budget.Amount;

            if (percentage <= 90)
            {
                return BudgetStatus.Under;
            }
            else if (percentage > 90 && percentage <= 100)
            {
                return BudgetStatus.AlmostThere;
            }
            else if (percentage > 100 && percentage <= 105)
            {
                return BudgetStatus.AtThreshold;
            }
            else if (percentage > 105)
            {
                return BudgetStatus.Over;
            }
            return BudgetStatus.Undefined;
        }
    }
}
