using Microsoft.AspNetCore.Mvc;
using System.Linq;
using server.DTO;
using Microsoft.AspNetCore.Http;
using server.ResourceManagers;
using server.Services;
using server.Models;

namespace server.Controllers
{
    [Route("api/select-options")]
    [ApiController]
    public class SelectOptionsController : ControllerBase
    {
        public readonly IUserManager _userManager;

        public readonly IAccountManager _accountManager;

        public readonly ISelectOptionsFormatter _formatter;

        public SelectOptionsController(IUserManager userManager, IAccountManager accountManager, ISelectOptionsFormatter formatter)
        {
            _userManager = userManager;
            _accountManager = accountManager;
            _formatter = formatter;
        }

        [HttpGet("accounts")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
            IQueryable<SelectOptionDto> options = _formatter.GetSelectOptions(accounts, "Name", name);

            return Ok(options);
        }
    }
}
