using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.ResourceManagers;

namespace server.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountManager _manager;

        private readonly string[] _accountIncludes = new string[] { "User", "Subscriptions", "Transactions" };

        public AccountController(IAccountManager accountManager)
        {
            _manager = accountManager;
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
        public ActionResult<Account> AddAccount([FromBody] Account account)
        {
            if (account.User != null)
            {
                return BadRequest("userId must be provided.");
            }
            _manager.AddAccount(account);

            return CreatedAtAction(nameof(GetAccount), new { Id = account.Id }, account);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Account> UpdateAccount([FromRoute]int id, [FromBody]Account account)
        {
            if (id != account.Id)
            {
                return BadRequest();    
            }

            var updatedAccount = _manager.UpdateAccount(account);
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