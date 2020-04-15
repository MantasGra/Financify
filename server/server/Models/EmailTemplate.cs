using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class EmailTemplate
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }
    }
}
