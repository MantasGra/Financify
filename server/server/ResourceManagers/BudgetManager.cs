using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Services;

namespace server.ResourceManagers
{
    public class BudgetManager : IBudgetManager
    {
        private readonly IStorage<Budget> _budgetStorage;

        public BudgetManager(IStorage<Budget> budgetStorage)
        {
            _budgetStorage = budgetStorage;
        }
        public Budget GetBudget(int id) 
        {
            return _budgetStorage.getItem(id);
        }
        public Budget AddBudget(Budget budget) 
        {
            return _budgetStorage.createItem(budget);
        }
        public IQueryable<Budget> GetBudgets(int ?userId)
        {
            return _budgetStorage.getCollection();
        }
        public void DeleteBudget(Budget budget) { }
    }
}
