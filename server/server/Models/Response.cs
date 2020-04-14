using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Response
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }

        public virtual CustomerSupport CustomerSupport { get; set; }
        public virtual BugReport BugReport { get; set; }
    }
}
