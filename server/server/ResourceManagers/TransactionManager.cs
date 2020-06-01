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

    public Transaction GetTransaction(int id, string[] includes = null)
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

    public IQueryable<Transaction> GetUserLastMonthTransactionsByCategory(int userId, TransactionCategory category, string[] includes = null)
    {
      var today = DateTime.Today;
      var max = new DateTime(today.Year, today.Month, 1);
      var min = max.AddMonths(-1);
      return _transactionStorage.getCollection()
          .Where(s => s.Account.UserId == userId)
          .Where(s => s.Category == category)
          .Where(s => s.Date >= min && s.Date < max);
    }
    public IQueryable<Transaction> GetTransactionsForBudget(Budget budget)
    {
      return _transactionStorage
          .getCollection()
          .Where(s => s.Category == budget.Category)
          .Where(s => s.Date >= budget.DateFrom && s.Date < budget.DateTo);
    }

    public List<Budget> FormRecommendedBudgets(int userId)
    {
      List<Budget> recommendedBudgets = new List<Budget>();
      foreach (TransactionCategory transactionCategory in Enum.GetValues(typeof(TransactionCategory)))
      {
        var transactions = GetUserLastMonthTransactionsByCategory(userId, transactionCategory);
        if (transactions != null && transactions.Count() > 5)
        {
          Budget recommendedBudget = new Budget();
          double sumAmount = (from x in transactions select x.Amount).Sum();
          recommendedBudget.Amount = sumAmount;
          recommendedBudget.Category = transactionCategory;
          recommendedBudget.UserId = userId;
          var year = DateTime.Today.Year;
          var month = DateTime.Today.Month;
          recommendedBudget.DateFrom = new DateTime(year, month, 1);
          recommendedBudget.DateTo = new DateTime(year, month, DateTime.DaysInMonth(year, month));
          recommendedBudgets.Add(recommendedBudget);
        }
      }
      return recommendedBudgets;
    }

    public IQueryable<Transaction> GetMonthlyTransactions(int userId, int numberOfMonths)
    {
      DateTime date = DateTime.UtcNow.AddMonths(-numberOfMonths).AddDays(-DateTime.UtcNow.AddMonths(-numberOfMonths).Day + 1);
      return _transactionStorage.getCollection().Where(t => t.Account.UserId == userId && !t.Disabled && t.Date >= date);
    }

    public Transaction CreateEliminatingTransaction(int accountId, double difference)
    {
      var tmp = new Transaction() { AccountId = accountId, Date = DateTime.Now, Description = "Elimination transaction", Amount = difference };
      return AddTransaction(tmp);
    }
  }
}