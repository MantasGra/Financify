using server.DTO;
using server.Models;
using System.Linq;

namespace server.Services
{
    public interface ISelectOptionsFormatter
    {
        IQueryable<SelectOptionDto> GetSelectOptions<T>(IQueryable<T> items, string property, string pattern) where T : Model;
    }
}
