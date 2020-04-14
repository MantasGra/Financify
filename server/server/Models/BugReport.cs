using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class BugReport
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime CreationDate { get; set; }

        [Required]
        public virtual User User { get; set; }

        public virtual ICollection<Response> Responses { get; set; }
    }
}
