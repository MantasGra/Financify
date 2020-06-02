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
    [Route("api/currency-subscriptions")]
    [ApiController]
    public class CurrencySubscriptionController : ControllerBase
    {
        private readonly ICurrencySubscriptionManager _manager;

        private readonly IUserManager _userManager;

        private readonly string[] _currencySubscriptionIncludes = new string[] { "User" };

        public CurrencySubscriptionController(ICurrencySubscriptionManager currencyManager, IUserManager userManager)
        {
            _manager = currencyManager;
            _userManager = userManager;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IQueryable<CurrencySubscription>> GetCurrencySubscriptions([FromQuery]int? userId)
        {
            IQueryable<CurrencySubscription> currencySubscriptions = null;
            if (userId.HasValue)
            {
                currencySubscriptions = _manager.GetUserCurrencySubscriptions(userId.Value, null, _currencySubscriptionIncludes);
            }
            else
            {
                currencySubscriptions = _manager.GetCurrencySubscriptions(_currencySubscriptionIncludes);
            }

            return Ok(currencySubscriptions);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CurrencySubscription> GetCurrencySubscription([FromRoute]int id)
        {
            var currencySubscriptions = _manager.GetCurrencySubscription(id, _currencySubscriptionIncludes);
            if (currencySubscriptions == null)
            {
                return NotFound();
            }
            return Ok(currencySubscriptions);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CurrencySubscription> AddCurrencySubscription([FromBody] CurrencySubscription currencySubscription)
        {
            if (currencySubscription.UserId == 0)
            {
                return BadRequest("userId must be provided.");
            }

            var user = _userManager.GetUser(currencySubscription.UserId);
            if (user == null)
            {
                return NotFound("User was not found.");
            }

            var currencySubscriptions = _manager.GetUserCurrencySubscriptions(user.Id, currencySubscription.Currency);
            if (currencySubscriptions.Any())
            {
                return BadRequest("User already has subscription for given currency.");
            }

            _manager.AddCurrencySubscription(currencySubscription);

            return CreatedAtAction(nameof(GetCurrencySubscription), new { Id = currencySubscription.Id }, currencySubscription);
        }
    }
}
