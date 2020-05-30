using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTO
{
    public class TendencyDto
    {
        public TendencyDto(DateTime date, double coeficient, double amount)
        {
            Date = date;
            Coeficient = coeficient;
            Amount = amount;
        }
        public TendencyDto() { }

        public DateTime Date { get; set; }
        public double Coeficient { get; set; }
        public double Amount { get; set; }
    }
}
