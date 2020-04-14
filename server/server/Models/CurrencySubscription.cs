using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class CurrencySubscription
    {
        public int Id { get; set; }
        public string Currency { get; set; }

        public virtual User User { get; set; }
    }
}
