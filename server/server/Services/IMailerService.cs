using System.Net.Mail;
using System.Collections.Generic;
using server.Models;

namespace server.Services
{
    public interface IMailerService
    {
        void SendEmail(string receiver, int templateId, string[] bodyParams);
        SmtpClient GetClient();
        MailMessage GetMessage(EmailTemplate template, string[] bodyParams);
        IEnumerable<string> FormatBodyParams(string[] bodyParams);
    }
}
