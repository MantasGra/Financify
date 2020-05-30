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

        public Transaction GetTransaction(int id,string[] includes = null)
        {
            return _transactionStorage.getItem(id, includes);
        }
        public Transaction AddTransaction(Transaction transaction)
        {
            return _transactionStorage.createItem(transaction);
        }

        public IQueryable<Transaction> GetTransactions()
        {
            return _transactionStorage
                .getCollection(new string[] { "Account" });
        }

        public IQueryable<Transaction> GetUserTransactions(int userId, string[] includes = null)
        {
            return _transactionStorage
                .getCollection(includes)
                .Where(t => t.Account.UserId == userId && !t.Disabled);
        }

        public void DeleteTransaction(Transaction transaction)
        {
            try
            {
                transaction.Disabled = true;
                _transactionStorage.updateItem(transaction);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Transaction UpdateTransaction(Transaction transaction, string[] includes = null)
        {
            return _transactionStorage.updateItem(transaction, includes);
        }
        public void SaveChanges() 
        {
            _transactionStorage.SaveChanges();
        }

        public IQueryable<Transaction> GetUserTransactionsByCategory(int userId, TransactionCategory category, string[] includes = null)
        {
            return _transactionStorage.getCollection().Where(s => s.Account.UserId == userId).Where(s => s.Category == category);
        }
        public IQueryable<Transaction> GetTransactionsForBudget(Budget budget)
        {
            return _transactionStorage.getCollection().Where(s => s.Category == budget.Category);
        }

        public List<Budget> FormRecommendedBudgets(int userId)
        {
            List<Budget> recommendedBudgets = new List<Budget>();
            foreach (TransactionCategory transactionCategory in Enum.GetValues(typeof(TransactionCategory)))
            {
                var transactions = GetUserTransactionsByCategory(userId, transactionCategory);
                int count = transactions.Count();
                if (transactions != null && count > 5) {
                    Budget recommendedBudget = new Budget();
                    double avgAmount = (from x in transactions select x.Amount).Sum() / count;
                    recommendedBudget.Amount = avgAmount;
                    recommendedBudget.Category = transactionCategory;
                    recommendedBudget.UserId = userId;
                    recommendedBudgets.Add(recommendedBudget);
                }
            }
            return recommendedBudgets;
        }
    }
}
