using System;

namespace server.DTO
{
    public class TendencyDto
    {
     
        public TendencyDto(double coefficient = 0, double amount = 0)
        {
            Coeficient = coefficient;
            Amount = amount;
        }
      
        public DateTime Date { get; set; }
        public double Coeficient { get; set; }
        public double Amount { get; set; }
    }
}
