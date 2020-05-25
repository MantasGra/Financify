import axios, { AxiosResponse } from 'axios';
import { Budget } from './types';

interface GetBudgetsResponse extends AxiosResponse {
  data: Budget[];
}

export const getBudgets = () => [
  {
    id: 1,
    category: 1,
    dateFrom: 'string',
    dateTo: 'string',
    status: 1,
    amount: 3000,
    usedAmount: 1000
  },
];
// axios
//   .get('https://localhost:5001/api/accounts', { params: { userId: 1 } })
//   .then((res: GetBudgetsResponse) => res.data);
