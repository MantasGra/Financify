import axios, { AxiosResponse } from 'axios';
import { Transaction, TransactionForm } from './types';

interface GetTransactionsResponse extends AxiosResponse {
  data: Transaction[];
}

export const getTransactions = () =>
  axios
    .get('https://localhost:5001/api/transactions', { params: { userId: 1 } })
    .then((res: GetTransactionsResponse) => res.data);

export const deleteTransaction = (id: number) =>
  axios
    .delete(`https://localhost:5001/api/transactions/${id}`)
    .then((res: AxiosResponse) => res.status);

export const createTransaction = (transaction: TransactionForm) =>
  axios
    .post('https://localhost:5001/api/transactions', transaction)
    .then((res: AxiosResponse) => res.data);

export const editTransaction = (transaction: TransactionForm) =>
  axios
    .put(
      `https://localhost:5001/api/transactions/${transaction.id}`,
      transaction
    )
    .then((res: AxiosResponse) => res.data);
