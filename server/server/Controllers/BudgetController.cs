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
    [Route("api/budgets")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly ITransactionManager _transactionManager;

        private readonly IBudgetManager _budgetManager;

        private readonly IUserManager _userManager;

        public BudgetController(ITransactionManager transactionManager, IBudgetManager budgetManager, IUserManager userManager)
        {
            _transactionManager = transactionManager;
            _budgetManager = budgetManager;
            _userManager = userManager;            
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<Budget> GetBudgets([FromQuery] int? userId)
        {
            var budgets = _budgetManager.GetBudgets(userId);
            return Ok(budgets);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Budget> AddBudget([FromBody] Budget budget)
        {
            if (budget.UserId == 0)
            {
                return BadRequest("userId must be provided.");
            }
            var user = _userManager.GetUser(budget.UserId);
            if (user == null)
            {
                return NotFound("User was not found.");
            }
            budget.Status = _budgetManager.GetBudgetStatus(budget);
            _budgetManager.AddBudget(budget);

            return CreatedAtAction(nameof(GetBudgets), new { Id = budget.Id }, budget);
        }
    }
}