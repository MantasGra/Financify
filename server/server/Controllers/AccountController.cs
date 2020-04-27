using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.ResourceManagers;
using Microsoft.AspNetCore.JsonPatch;

namespace server.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountManager _manager;
   
        private readonly IUserManager _userManager;

        private readonly string[] _accountIncludes = new string[] { "User", "Subscriptions", "Transactions" };

        public AccountController(IAccountManager accountManager, IUserManager userManager)
        {
            _manager = accountManager;
            _userManager = userManager;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IQueryable<Account>> GetAccounts([FromQuery]int? userId)
        {
            IQueryable<Account> accounts = null;
            if (userId.HasValue)
            {
                accounts = _manager.GetUserAccounts(userId.Value, _accountIncludes);
            }
            else
            {
                accounts = _manager.GetAccounts(_accountIncludes);
            }
            return Ok(accounts);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Account> GetAccount([FromRoute]int id)
        {
            var account = _manager.GetAccount(id, _accountIncludes);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Account> AddAccount([FromBody] Account account)
        {
            if (account.UserId == 0)
            {
                return BadRequest("userId must be provided.");
            }
            var user = _userManager.GetUser(account.UserId);
            if (user == null)
            {
                return NotFound("User was not found.");
            }

            _manager.AddAccount(account);

            return CreatedAtAction(nameof(GetAccount), new { Id = account.Id }, account);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Account> UpdateAccount([FromRoute] int id, [FromBody] Account account)
        {
            if (account.Id == 0)
            {
                return BadRequest("Id must be provided");
            }
            if (id != account.Id)
            {
                return BadRequest("Resource Id and route id does not match");
            }

            var oldAccount = _manager.GetAccount(account.Id);
            if (oldAccount == null)
            {
                return NotFound("Resource was not found");
            }

            var user = _userManager.GetUser(account.UserId);
            if (user == null)
            {
                return NotFound("User was not found");
            }

            Account updatedAccount = null;
            try
            {
                updatedAccount = _manager.UpdateAccount(account, _accountIncludes);
            }
            catch
            {
                return BadRequest();
            }
            return Ok(updatedAccount);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Account> DeleteAccount([FromRoute]int id)
        {
            var account = _manager.GetAccount(id);

            if (account == null)
            {
                return NotFound();
            }
            _manager.DeleteAccount(account);
            return Ok();
        }
    }
}