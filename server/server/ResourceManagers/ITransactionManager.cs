﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.ResourceManagers
{
    public interface ITransactionManager
    {
        Transaction GetTransaction(int id, string[] includes = null);
        Transaction AddTransaction(Transaction transaction);
        IQueryable<Transaction> GetTransactions();
        IQueryable<Transaction> GetUserTransactions(int userId, string[] includes = null);
        void DeleteTransaction(Transaction transaction);
        Transaction UpdateTransaction(Transaction transaction, string[] includes = null);
        void SaveChanges();
        IQueryable<Transaction> GetTransactionsForBudget(Budget budget);
        List<Budget> FormRecommendedBudgets(int userId);
        IQueryable<Transaction> GetMonthlyTransactions(int userId, int numberOfMonths);
        Transaction CreateEliminatingTransaction(int accountId,double difference);
    }
}
