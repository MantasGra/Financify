using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.ResourceManagers
{
    public interface IBudgetManager
    {
        Budget GetBudget(int id);
        Budget AddBudget(Budget budget);
        IQueryable<Budget> GetBudgets(int ?userId);
        void DeleteBudget(Budget budget);

    }
}
