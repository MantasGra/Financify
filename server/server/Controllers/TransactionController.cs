using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.DTO;
using server.ResourceManagers;
using server.Services;

namespace server.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionManager _transactionManager;

        private readonly IAccountManager _accountManager;

        public readonly ITendenciesService _tendenciesService;

        private readonly string[] _transactionIncludes = new string[] { "Account" };

        public TransactionController(ITransactionManager transactionManager, IAccountManager accountManager, ITendenciesService tendenciesService)
        {
            _transactionManager = transactionManager;
            _accountManager = accountManager;
            _tendenciesService = tendenciesService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Transaction> GetTransactions([FromQuery] int? userId)
        {
            IQueryable<Transaction> transactions = null;
            if (userId.HasValue)
            {
                transactions = _transactionManager.GetUserTransactions(userId.Value, _transactionIncludes);
            }
            else
            {
                transactions = _transactionManager.GetTransactions();
            }
            return Ok(transactions);
        }

        [HttpGet("tendencies")]  
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<TendencyDto> GetTendencies([FromQuery] int? userId)
        {
            List<TendencyDto> tendencies = new List<TendencyDto>();
            IQueryable<Transaction> transactions = null;
            if (userId.HasValue)
            {
                transactions = _transactionManager.GetUserTransactions(userId.Value, _transactionIncludes);
                tendencies = _tendenciesService.getTendencies(transactions);
            }
          
            return Ok(tendencies);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult<Transaction> PostTransaction([FromBody]Transaction transaction)
        {
            _transactionManager.AddTransaction(transaction);
            return CreatedAtAction(nameof(GetTransactions), new { Id = transaction.Id }, _transactionManager.GetTransaction(transaction.Id, _transactionIncludes));
        }
        
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Transaction> GetTransaction(int id)
        {
            var transaction = _transactionManager.GetTransaction(id, _transactionIncludes);

            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Transaction> UpdateTransaction([FromRoute] int id, [FromBody] Transaction transaction)
        {
            if (transaction.Id == 0)
            {
                return BadRequest("Id must be provided");
            }
            if (id != transaction.Id)
            {
                return BadRequest("Resource Id and route id does not match");
            }

            var oldTransaction = _transactionManager.GetTransaction(transaction.Id);
            if (oldTransaction == null)
            {
                return NotFound("Resource was not found");
            }

            var account = _accountManager.GetAccount(transaction.AccountId);
            if (account == null)
            {
                return NotFound("Account was not found");
            }
            transaction.Disabled = oldTransaction.Disabled;

            Transaction updatedTransaction = null;
            try
            {
                updatedTransaction = _transactionManager.UpdateTransaction(transaction, _transactionIncludes);
            }
            catch
            {
                return BadRequest();
            }
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