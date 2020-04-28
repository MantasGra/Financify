using server.DTO;
using server.Models;
using System.Linq;

namespace server.Services
{
    public interface ISelectOptionsFormatter
    {
        IQueryable<SelectOptionDto> GetAccountSelectOptions(IQueryable<Account> items, string pattern);
    }
}
