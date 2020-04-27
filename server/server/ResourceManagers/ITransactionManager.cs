using System;
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
        IQueryable<Transaction> GetUserTransactions(int userId, string[] includes = null);
        void DeleteTransaction(Transaction transaction);
        Transaction UpdateTransaction(Transaction transaction);
        Transaction UpdateTransaction(Transaction old, Transaction newTransaction);
    }
}
