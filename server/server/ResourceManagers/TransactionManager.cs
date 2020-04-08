using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;
using server.Services;

namespace server.ResourceManagers
{
    public class TransactionManager : ITransactionManager
    {
        private readonly IStorage<Transaction> _transactionStorage;

        public TransactionManager(IStorage<Transaction> storage)
        {
            _transactionStorage = storage;
        }

        public Transaction GetTransaction(int id)
        {
            return _transactionStorage.getItem(id);
        }
        public Transaction AddTransaction(Transaction transaction)
        {
            return _transactionStorage.createItem(transaction);
        }

        public IQueryable<Transaction> GetTransactions()
        {
            return _transactionStorage.getCollection();
        }

        public void DeleteTransaction(Transaction transaction)
        {
            try
            {
                _transactionStorage.removeItem(transaction);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
