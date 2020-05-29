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
        List<BudgetDto> GetBudgets(int ?userId);
        void DeleteBudget(Budget budget);
    }
}
