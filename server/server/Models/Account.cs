﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public enum AccountType
    {
        Cash,
        CreditCard,
        EWallet
    }

    public class Account : Model
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        public AccountType Type { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public virtual ICollection<Subscription> Subscriptions { get; set; }

        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
