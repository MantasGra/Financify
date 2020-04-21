using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Response : AModel
    {
        [Required]
        public string Content { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime CreationDate { get; set; }

        [Required]
        public int CustomerSupportId { get; set; }

        [ForeignKey("CustomerSupportId")]
        public virtual CustomerSupport CustomerSupport { get; set; }

        [Required]
        public virtual BugReport BugReport { get; set; }
    }
}
