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
		private readonly IAccountManager _accountManager;
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
            return Created(nameof(GetTransactions), transaction);
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
            //TODO: implement PATCH method, for ref check https://docs.microsoft.com/en-us/aspnet/core/web-api/jsonpatch?view=aspnetcore-3.1
            return Ok();
        }
		public ActionResult<Transaction> CreateEliminatingTransaction(double newValue, int accountId)
		{
			sum = 0;
			var transactions = _accountManager.GetAccount(accountId).Transactions;
			foreach(Transaction transaction in transactions)
			{
				sum += transaction.Amount;
			}
			var tmp = new Transaction() { AccountId = accountId, Date = DateTime(), Description = "Elimination transaction", Amount = newValue - sum };
			_transactionManager.AddTransaction(tmp);
			return Ok(tmp);
		}







    }
}