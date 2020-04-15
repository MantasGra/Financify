using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class CurrencySubscription
    {
        public int Id { get; set; }

        [Required]
        [StringLength(10)]
        public string Currency { get; set; }

        [Required]
        public virtual User User { get; set; }
    }
}
