using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class BugReport
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Response> Responses { get; set; }
    }
}
