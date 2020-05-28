using System;
using System.Collections.Generic;
using System.Linq;
using FluentScheduler;
using Newtonsoft.Json;
using server.Models;
using server.ResourceManagers;

namespace server.Services
{
    public class GoodCurrencyPriceCron : Registry
    {
        private readonly ICurrencySubscriptionManager _resourceManager;

        private static List<LatestRate> latestRates = new List<LatestRate>();

        public GoodCurrencyPriceCron(ICurrencySubscriptionManager resourceManager)
        {
            _resourceManager = resourceManager;

            Schedule(() => Execute()).ToRunNow();
        }

        private void Execute()
        {
            IQueryable<CurrencySubscription> currencySubscriptions = _resourceManager.GetCurrencySubscriptions(new string[] { "User" });
            foreach (var currencySubscription in currencySubscriptions)
            {
                CheckRatePrice(currencySubscription);
            }
        }

        public static void CheckRatePrice(CurrencySubscription currencySubscription)
        {
            var checkList = latestRates.Where(lr => lr.Symbol.CompareTo(currencySubscription.Currency) == 0);
            if(!checkList.Any())
            {
                var result = GetLatestRate(currencySubscription.Currency);
                if (result != null)
                {
                    latestRates.Add(result);
                }
            }
        }

        //public static bool GetLastMonthRates(string currency)
        //{
        //// https://api.exchangeratesapi.io/history?start_at=2020-04-01&end_at=2020-04-30&base=USD&symbols=EUR,GBP,KRW
        //    try
        //    {
        //        String URLString = $"https://api.exchangeratesapi.io/latest?base=USD&symbols={currency}";
        //        using (var webClient = new System.Net.WebClient())
        //        {
        //            var json = webClient.DownloadString(URLString);
        //            ERP_API Test = JsonConvert.DeserializeObject<ERP_API>(json);
        //            return true;
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }
        //}

        public static LatestRate GetLatestRate(string rate)
        {
            try
            {
                String URLString = $"https://api.exchangeratesapi.io/latest?base=USD&symbols={rate}";
                using (var webClient = new System.Net.WebClient())
                {
                    var json = webClient.DownloadString(URLString);
                    ERP_API Test = JsonConvert.DeserializeObject<ERP_API>(json);
                    return new LatestRate(rate, Convert.ToDouble(Test.rates.GetType().GetProperty(rate).GetValue(Test.rates)));
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }

    public class LatestRate
    {
        public string Symbol { get; set; }
        public double Rate { get; set; }

        public LatestRate(string Symbol, double Rate)
        {
            this.Symbol = Symbol;
            this.Rate = Rate;
        }
    }
}
