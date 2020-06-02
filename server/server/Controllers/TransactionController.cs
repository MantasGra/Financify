using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DTO;
using server.Models;
using server.ResourceManagers;
using server.Services;

namespace server.Controllers {
    [Route ("api/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase {
        private readonly ITransactionManager _transactionManager;

        private readonly IAccountManager _accountManager;

        public readonly ITendenciesService _tendenciesService;

        public readonly IReportsService _reportsService;

        public readonly IBudgetManager _budgetManager;

        private readonly string[] _transactionIncludes = new string[] { "Account" };

        public TransactionController (ITransactionManager transactionManager, IAccountManager accountManager, ITendenciesService tendenciesService, IReportsService reportsService, IBudgetManager budgetManager)
        {
            _transactionManager = transactionManager;
            _accountManager = accountManager;
            _tendenciesService = tendenciesService;
            _reportsService = reportsService;
            _budgetManager = budgetManager;
        }

        [HttpGet]
        [ProducesResponseType (StatusCodes.Status200OK)]
        public ActionResult<Transaction> GetTransactions ([FromQuery] int? userId) {
            IQueryable<Transaction> transactions = null;
            if (userId.HasValue) {
                transactions = _transactionManager.GetUserTransactions (userId.Value, _transactionIncludes);
            } else {
                transactions = _transactionManager.GetTransactions ();
            }
            return Ok (transactions);
        }

        [HttpGet ("tendencies")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        public ActionResult<List<TendencyDto>> GetTendencies ([FromQuery] int userId) {
            if (userId > 0) {
                IQueryable<Transaction> transactions = _transactionManager.GetUserTransactions (userId, _transactionIncludes);
                List<TendencyDto> tendencies = _tendenciesService.FormTendencies (transactions);
                return Ok (tendencies);
            } else {
                return NotFound ();
            }

        }

        [HttpPost]
        [ProducesResponseType (StatusCodes.Status201Created)]
        public ActionResult<Transaction> PostTransaction ([FromBody] Transaction transaction) {
            if (transaction == null)
            {
                return BadRequest();
            }
            _transactionManager.AddTransaction(transaction);
            _budgetManager.RecalculateBudgetStatus(transaction.Category, transaction.Date);
            return CreatedAtAction (nameof (GetTransactions), new { Id = transaction.Id }, _transactionManager.GetTransaction (transaction.Id, _transactionIncludes));
        }

        [HttpGet ("{id}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        public ActionResult<Transaction> GetTransaction (int id) {
            var transaction = _transactionManager.GetTransaction (id, _transactionIncludes);

            if (transaction == null) {
                return NotFound ();
            }
            return Ok (transaction);
        }

        [HttpDelete ("{id}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        public ActionResult<Transaction> DeleteTransaction ([FromRoute] int id) {
            var transaction = _transactionManager.GetTransaction (id);
            if (transaction != null) {
                _transactionManager.DeleteTransaction (transaction);
                _budgetManager.RecalculateBudgetStatus(transaction.Category, transaction.Date);
                return Ok ();
            }
            return NotFound ();
        }

        [HttpPut ("{id}")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        [ProducesResponseType (StatusCodes.Status404NotFound)]
        public ActionResult<Transaction> UpdateTransaction ([FromRoute] int id, [FromBody] Transaction transaction) {
            if (transaction.Id == 0) {
                return BadRequest ("Id must be provided");
            }
            if (id != transaction.Id) {
                return BadRequest ("Resource Id and route id does not match");
            }

            var oldTransaction = _transactionManager.GetTransaction (transaction.Id);
            if (oldTransaction == null) {
                return NotFound ("Resource was not found");
            }

            var account = _accountManager.GetAccount (transaction.AccountId);
            if (account == null) {
                return NotFound ("Account was not found");
            }
            transaction.Disabled = oldTransaction.Disabled;

            Transaction updatedTransaction = null;
            try {
                updatedTransaction = _transactionManager.UpdateTransaction (transaction, _transactionIncludes);
                _budgetManager.RecalculateBudgetStatus(transaction.Category, transaction.Date);
            }
            catch {
                return BadRequest ();
            }
            return Ok (updatedTransaction);
        }

        [HttpGet ("/api/recommended-budgets")]
        public ActionResult<Budget[]> GetRecommendedBudgets ([FromQuery] int userId) {
            return Ok (_transactionManager.FormRecommendedBudgets (userId));
        }

        [HttpGet ("expenses-report")]
        [ProducesResponseType (StatusCodes.Status200OK)]
        [ProducesResponseType (StatusCodes.Status400BadRequest)]
        public ActionResult<List<MonthlyExpensesDto>> GetMonthlyExpensesReport ([FromQuery] int userId) {
            if (userId == 0) {
                return BadRequest ("You must provide user id");
            }
            List<MonthlyExpensesDto> expensesReport = _reportsService.FormMonthlyExpensesReport (userId);
            return Ok (expensesReport);
        }
    }
  }
}