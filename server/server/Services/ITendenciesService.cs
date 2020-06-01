using System.Collections.Generic;
using System.Linq;
using server.DTO;
using server.Models;

namespace server.Services
{
    public interface ITendenciesService
    {
       public List<TendencyDto> FormTendencies(IQueryable<Transaction> transactions);

    }
}