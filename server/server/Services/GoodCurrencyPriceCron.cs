using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using FluentScheduler;
using Microsoft.AspNetCore.Localization;
using Newtonsoft.Json;
using server.Models;
using server.ResourceManagers;

namespace server.Services
{
    public class GoodCurrencyPriceCron : Registry
    {
        private readonly ICurrencySubscriptionManager _resourceManager;

        private readonly IEmailTemplateManager _templateManager;

        private readonly IMailerService _mailerService;

        public GoodCurrencyPriceCron(ICurrencySubscriptionManager resourceManager, IEmailTemplateManager templateManager, IMailerService mailerService)
        {
            _resourceManager = resourceManager;
            _templateManager = templateManager;
            _mailerService = mailerService;

            Schedule(() => Execute()).ToRunNow();
        }

        private void Execute()
        {
            IQueryable<CurrencySubscription> currencySubscriptions = _resourceManager.GetCurrencySubscriptions(new string[] { "User" });
            foreach (var currencySubscription in currencySubscriptions)
            {
                var latestPrice = CheckForGoodPrice(currencySubscription.Currency);
                if (latestPrice > 0)
                {
                    _mailerService.SendEmail(currencySubscription.User.Email, 1, new object[] { currencySubscription.Currency, latestPrice });
                }
            }
        }

        public double CheckForGoodPrice(string currency)
        {
            var latestPrice = GetLatestRate(currency);
            if (latestPrice < GetLastMonthAverageRate(currency))
            {
                return latestPrice;
            }
            return 0;
        }

        public double GetLastMonthAverageRate(string currency)
        {
            try
            {
                var month = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
                var first = month.AddMonths(-1);
                var last = month.AddDays(-1);
                var firstDate = first.ToString("yyyy-MM-dd");
                var lastDate = last.ToString("yyyy-MM-dd");

                String URLString = $"https://api.exchangeratesapi.io/history?start_at={firstDate}&end_at={lastDate}&base=USD&symbols={currency}";
                using (var webClient = new System.Net.WebClient())
                {
                    var json = webClient.DownloadString(URLString);
                    dynamic Rates = JsonConvert.DeserializeObject<dynamic>(json);

                    int days = DateTime.DaysInMonth(first.Year, first.Month);
                    double sum = 0;
                    int foundDays = 0;

                    for (int day = 1; day <= days; day++)
                    {
                        var checkDate = new DateTime(first.Year, first.Month, day).ToString("yyyy-MM-dd");
                        if (Rates.rates[checkDate] != null)
                        {
                            sum += Convert.ToDouble(Rates.rates[checkDate][currency]);
                            foundDays++;
                        }
                    }
                    return (sum / foundDays);
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public double GetLatestRate(string currency)
        {
            try
            {
                String URLString = $"https://api.exchangeratesapi.io/latest?base=USD&symbols={currency}";
                using (var webClient = new System.Net.WebClient())
                {
                    var json = webClient.DownloadString(URLString);
                    dynamic Test = JsonConvert.DeserializeObject<dynamic>(json);
                    return Convert.ToDouble(Test.rates[currency]);
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
