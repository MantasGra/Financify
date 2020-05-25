using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTO
{
    public class TendencyDto
    {
            public TendencyDto(int month, double coeficient, double amount)
            {
                Month = month;
                Coeficient = coeficient;
                Amount = amount;
            }

            public int Month { get; set; }
            public double Coeficient { get; set; }
            public double Amount { get; set; }      
    }
}
