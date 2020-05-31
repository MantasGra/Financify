import axios, { AxiosResponse } from 'axios';
import { Tendency, ExpensesReport } from './types';

interface GetTendenciesResponse extends AxiosResponse {
  data: Tendency[];
}

interface GetExpensesReport extends AxiosResponse {
  data: ExpensesReport[];
}

export const getTendencies = () =>
  axios
    .get('https://localhost:5001/api/transactions/tendencies', {
      params: { userId: 1 },
    })
    .then((res: GetTendenciesResponse) => res.data);

export const getExpensesReport = () =>
  axios
    .get('https://localhost:5001/api/transactions/expenses-report', {
      params: { userId: 1 },
    })
    .then((res: GetExpensesReport) => res.data);
