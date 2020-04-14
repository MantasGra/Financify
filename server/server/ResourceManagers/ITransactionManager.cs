﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.ResourceManagers
{
    public interface ITransactionManager
    {
        Transaction GetTransaction(int id);
        Transaction AddTransaction(Transaction transaction);
        IQueryable<Transaction> GetTransactions();
        void DeleteTransaction(Transaction transaction);

    }
}