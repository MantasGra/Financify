using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.DTO;

namespace server.ResourceManagers
{
    public interface IBudgetManager
    {
        Budget GetBudget(int id);
        Budget AddBudget(Budget budget);
        Budget UpdateBudget(Budget budget, string[] includes = null);
        List<BudgetDto> GetBudgets(int ?userId);
        void RecalculateBudgetStatus(TransactionCategory category, DateTime date);
        BudgetStatus GetBudgetStatus(Budget budget);
    }
}
