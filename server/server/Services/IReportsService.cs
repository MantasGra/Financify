using server.DTO;
using System.Collections.Generic;


namespace server.Services
{
    public interface IReportsService
    {
        List<MonthlyExpensesDto> FormMonthlyExpensesReport(int userId);
    }
}