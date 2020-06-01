using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTO
{
    public class EliminateTransactionDto
    {
        public int AccountId { get; set; }
        public double NewValue { get; set; }
    }
}
