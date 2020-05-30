using server.ResourceManagers;
using System.Net;
using System.Net.Mail;
using System.Collections.Generic;
using server.Models;
using server.DTO;
using System;
using System.Linq;

namespace server.Services
{
    public class TendenciesService : ITendenciesService
    {
    
        public List<TendencyDto> formTendencies(IQueryable<Transaction> transactions)
        {
            List<TendencyDto> tendencies = new List<TendencyDto>() ;
            var transactionList = transactions.ToList();
            DateTime main = DateTime.Now;
    

            for (int i = 4; i >= 1; i--)
            {
                List<Transaction> transactionss = new List<Transaction>();
                DateTime end = main.AddMonths(-i + 1).AddDays(-(main.Day));
                for (int n = 0; n < transactions.Count(); n++)
                {

                    if (transactionList[n].Date <= end)
                    {
                        transactionss.Add(transactionList[n]);
                    }
                }
                tendencies.Add(createTendency(transactionss, end));
                Console.WriteLine();
            }

            for (int i = 1; i < tendencies.Count; i++)
            {
                tendencies[i].Coeficient = tendencies[i].Amount / tendencies[i - 1].Amount;
            }



            for (int i = 1; i <= 3; i++)
            {
                tendencies.Add(calculateFutureMonths(tendencies));
            }

            tendencies.RemoveAt(0);

            return tendencies;
        }

       public TendencyDto createTendency(List<Transaction> transactions, DateTime date)
        {
            TendencyDto tendency = new TendencyDto();
            tendency.Amount = 0;
            for (int i = 0; i < transactions.Count; i++)
            {
                tendency.Amount += transactions[i].Amount;
            }

            tendency.Date = date;
            return tendency;
        }

        public TendencyDto calculateFutureMonths(List<TendencyDto> tendencies)
        {
            TendencyDto tendency = new TendencyDto();
            tendency.Date = tendencies[tendencies.Count - 1].Date.AddMonths(2).AddDays(-tendencies[tendencies.Count - 1].Date.Day);
            double coffecientSum = 0;

            for (int i = tendencies.Count-1; i > tendencies.Count - 4; i--)
            {
                coffecientSum += tendencies[i].Coeficient;
            }
            tendency.Coeficient = coffecientSum /= 3;
            tendency.Amount = tendencies[tendencies.Count - 1].Amount * tendency.Coeficient;

            return tendency;

        }
    }
}
