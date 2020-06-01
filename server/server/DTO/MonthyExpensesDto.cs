namespace server.DTO
{
    public class MonthlyExpensesDto
    {
        public double Expenses { get; set; }
        public string Month { get; set; }

        public MonthlyExpensesDto(double expenses, string month)
        {
            Expenses = expenses;
            Month = month;
        }
    }
}
