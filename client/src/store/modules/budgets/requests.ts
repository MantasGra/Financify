import axios, { AxiosResponse } from 'axios';
import { Budget } from './types';

interface GetBudgetsResponse extends AxiosResponse {
  data: Budget[];
}

export const getBudgets = () =>
  axios
    .get('https://localhost:5001/api/budgets', { params: { userId: 1 } })
    .then((res: GetBudgetsResponse) => res.data);
