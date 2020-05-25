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
    [Route("api/tendencies")]
    [ApiController]
    public class TendenciesController : ControllerBase
    {
        private readonly ITransactionManager _transactionManager;


        private readonly string[] _transactionIncludes = new string[] { "Account" };

        public TendenciesController(ITransactionManager transactionManager, IAccountManager accountManager)
        {
            _transactionManager = transactionManager;
        }


        public struct Tendency
        {
            public Tendency(int month, double coeficient, double amount)
            {
                Month = month;
                Coeficient = coeficient;
                Amount = amount;
            }

            public int Month { get; set; }
            public double Coeficient { get; set; }
            public double Amount { get; set; }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<Tendency>> GetTendencies([FromQuery]int? userId)
        {
            List<Tendency> tendencies = new List<Tendency>();

            IQueryable<Transaction> transactions = null;
            if (userId.HasValue)
            {
                DateTime currentDate = DateTime.Now;
                transactions = _transactionManager.GetUserTransactionsByDate(userId.Value, currentDate.AddDays(-(currentDate.Day - 1)).AddMonths(-3), _transactionIncludes);

                for (int i = 0; i <= 3; i++)
                {
                    double temp = 0;
                    foreach (var transaction in transactions)
                    {
                        if (transaction.Date >= new DateTime(currentDate.Year, currentDate.Month - i, 1) &&
                            transaction.Date <= new DateTime(currentDate.Year, currentDate.Month - i, DateTime.DaysInMonth(currentDate.Year, currentDate.Month - i)))
                        {
                            temp += transaction.Amount;
                        }
                    }

                    if (i > 0)
                    {
                        tendencies.Add(new Tendency(currentDate.Month - i, temp / tendencies[0].Amount, temp));
                    }
                    else
                    {
                        tendencies.Add(new Tendency(currentDate.Month - i, 0, temp));
                    }

                }
                tendencies.Add(new Tendency(currentDate.Month + 1, 0, tendencies[0].Amount * (tendencies[1].Coeficient + tendencies[2].Coeficient + tendencies[3].Coeficient) / 3));
            }

            if (transactions == null)
            {
                return NotFound();
            }

            return Ok(tendencies.OrderByDescending(x => x.Month).ToList());
        }



    }
}