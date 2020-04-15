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
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountManager _accountManager;

        public AccountController(IAccountManager accountManager)
        {
            _accountManager = accountManager;
        }

        [HttpGet]
        public ActionResult<Account> GetAccounts()
        {
            var accounts = _accountManager.GetAccounts();
            return Ok(accounts);
        }

        [HttpPost]
        public ActionResult<Account> PostAccount([FromBody]Account account)
        {
            _accountManager.AddAccount(account);
            return Created(nameof(GetAccounts), account);
        }

        [HttpGet("{id}")]
        public ActionResult<Account> GetAccount(int id)
        {
            var account = _accountManager.GetAccount(id);

            if (account == null)
            {
                return NotFound();
            }

            return Ok(account);
        }

        [HttpDelete("{id}")]
        public ActionResult<Account> DeleteAccount([FromRoute]int id)
        {
            var account = _accountManager.GetAccount(id);
            if (account != null)
            {
                _accountManager.DeleteAccount(account);
                return Ok();
            }
            return NotFound();
        }

        [HttpPatch("{id}")]
        public ActionResult<Account> UpdateAccount([FromRoute]int id, [FromBody]Account account)
        {
            //TODO: implement PATCH method, for ref check https://docs.microsoft.com/en-us/aspnet/core/web-api/jsonpatch?view=aspnetcore-3.1
            return Ok();
        }
    }
}