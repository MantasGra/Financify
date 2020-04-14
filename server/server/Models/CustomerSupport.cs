using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class CustomerSupport : User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AccountType? Type { get; set; }

        public virtual Account Account { get; set; }
    }
}
