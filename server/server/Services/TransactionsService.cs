using server.ResourceManagers;
using System.Net;
using System.Net.Mail;
using System.Collections.Generic;
using server.Models;
using System;
using server.DTO;

namespace server.Services
{
    public class TransactionService : ITransactionService
    {
        private ITransactionManager _transactionManager;
        private IAccountManager _accountManager;
        public TransactionService(ITransactionManager transactionManager,IAccountManager accountManager)
        {
            _accountManager = accountManager;
            _transactionManager = transactionManager;
        }



     public Transaction CreateEliminatingTransaction(int accountId,double difference)
        {
        	var tmp = new Transaction() { AccountId = accountId, Date = DateTime.Now, Description = "Elimination transaction", Amount = difference};
            return _transactionManager.AddTransaction(tmp);
            // return CreatedAtAction(nameof(GetTransactions), new { Id = tmp.Id }, _transactionManager.GetTransaction(tmp.Id, _transactionIncludes));
        }
    }


} 