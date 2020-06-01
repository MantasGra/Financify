using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTO;
using server.Models;

namespace server.Services
{
    public interface ITransactionService
    {
        Transaction CreateEliminatingTransaction(int accountId,double difference);
    }
}
