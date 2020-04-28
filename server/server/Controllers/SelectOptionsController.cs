using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTO;
using Microsoft.AspNetCore.Http;
using server.ResourceManagers;
using server.Models;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;

namespace server.Conntrollers
{
    [Route("api/select-options")]
    [ApiController]
    public class SelectOptionsController : ControllerBase
    {
        public readonly IUserManager _userManager;

        public readonly IAccountManager _accountManager;

        public SelectOptionsController(IUserManager userManager, IAccountManager accountManager)
        {
            _userManager = userManager;
            _accountManager = accountManager;
        }

        [HttpGet("accounts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<IQueryable<SelectOptionDto>> GetAccountsOptions([FromQuery] int userId, [FromQuery] string name)
        {
            if (userId == 0)
            {
                return BadRequest("userId must be provided");
            }

            var user = _userManager.GetUser(userId);
            if (user == null)
            {
                return NotFound("User does not exist");
            }

            var accounts = _accountManager.GetUserAccounts(userId);
            IQueryable<SelectOptionDto> options = accounts
                .Where(a => EF.Functions.Like(a.Name, $"%{name}%"))
                .Select(a => new SelectOptionDto
                {
                    Id = a.Id,
                    Name = a.Name
                });

            return Ok(options);
        }
    }
}
