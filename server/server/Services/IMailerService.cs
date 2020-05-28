using System.Net.Mail;
using System.Collections.Generic;
using server.Models;

namespace server.Services
{
    public interface IMailerService
    {
        void SendEmail(string receiver, int templateId, object[] bodyParams);
        SmtpClient GetClient();
        MailMessage GetMessage(EmailTemplate template, MailAddress from, MailAddress to, object[] bodyParams);
    }
}
