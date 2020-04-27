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
            return _transactionStorage.getItem(id,new string[]{"Account"});
        }
        public Transaction AddTransaction(Transaction transaction)
        {
            return _transactionStorage.createItem(transaction);
        }

        public IQueryable<Transaction> GetTransactions()
        {
            return _transactionStorage.getCollection(new string[]{"Account"});
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
        public Transaction UpdateTransaction(Transaction transaction)
        {
            return _transactionStorage.updateItem(transaction);
        }
        public Transaction UpdateTransaction(Transaction oldTransaction,Transaction newTransaction)
        {
            return _transactionStorage.updateItem(oldTransaction,newTransaction);
        }
    }
}
