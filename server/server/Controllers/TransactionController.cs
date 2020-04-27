using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.ResourceManagers;

namespace server.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionManager _transactionManager;
		public TransactionController(ITransactionManager transactionManager)
        {
            _transactionManager = transactionManager;
        }

        [HttpGet]
        public ActionResult<Transaction> GetTransactions()
        {
            var transactions = _transactionManager.GetTransactions();
            return Ok(transactions);
        }

        [HttpPost]
        public ActionResult<Transaction> PostTransaction([FromBody]Transaction transaction)
        {
            _transactionManager.AddTransaction(transaction);
            return CreatedAtAction(nameof(GetTransactions), new {Id =transaction.Id}, transaction);
        }
        
        [HttpGet("{id}")]
        public ActionResult<Transaction> GetTransaction(int id)
        {
            var transaction = _transactionManager.GetTransaction(id);

            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        public ActionResult<Transaction> DeleteTransaction([FromRoute]int id)
        {
            var transaction = _transactionManager.GetTransaction(id);
            if (transaction != null)
            {
                _transactionManager.DeleteTransaction(transaction);
                return Ok();
            }
            return NotFound();
        }

        [HttpPatch("{id}")]
        public ActionResult<Transaction> UpdateTransaction([FromRoute]int id, [FromBody]Transaction transaction)
        {
            var old = _transactionManager.GetTransaction(id);
            transaction.AccountId = transaction.AccountId == 0 ? old.AccountId : transaction.AccountId;
            transaction.Amount = transaction.Amount == 0 ? old.Amount : transaction.Amount;
            transaction.Category = transaction.Category == 0 ? old.Category : transaction.Category;
            transaction.Description = transaction.Description == "" ? old.Description : transaction.Description;
            transaction.Date = transaction.Date.CompareTo(DateTime.Parse("0001-01-01 00:00:00"))==0 ? old.Date : transaction.Date;
           
            if (old == null)
            {
                return NotFound();    
            }
            var updatedTransaction = _transactionManager.UpdateTransaction(old,transaction);
            return Ok(updatedTransaction);
        }
		// public ActionResult<Transaction> CreateEliminatingTransaction(double newValue, int accountId)
		// {
		// 	double sum = 0;
		// 	var transactions = _accountManager.GetAccount(accountId).Transactions;
		// 	foreach(Transaction transaction in transactions)
		// 	{
		// 		sum += transaction.Amount;
		// 	}
			
			
            

		// 	var tmp = new Transaction() { AccountId = accountId, Date = DateT, Description = "Elimination transaction", Amount = newValue - sum };
		// 	_transactionManager.AddTransaction(tmp);
		// 	return Ok(tmp);
		// }
		// public ActionResult<string> ConstructCsv(int accountId)
		// {
		// 	string csv = "";
		// 	var transactions = _accountManager.GetAccount(accountId).Transactions;
		// 	foreach (Transaction transaction in transactions)
		// 	{
		// 		if (!transaction.Disabled)
		// 		{
		// 			csv += $"{transaction.Amount};{transaction.Description};{transaction.Date};{transaction.Category}\n";
		// 		}
		// 	}
		// 	return Ok(csv);
		// }








	}
}