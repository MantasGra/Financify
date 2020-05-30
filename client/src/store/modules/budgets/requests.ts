import axios, { AxiosResponse } from 'axios';
import { Budget, BudgetFormType } from './types';

interface GetBudgetsResponse extends AxiosResponse {
  data: Budget[];
}

export const getBudgets = () =>
  axios
    .get('https://localhost:5001/api/budgets', { params: { userId: 1 } })
    .then((res: GetBudgetsResponse) => res.data);

export const createBudget = (budget: BudgetFormType) =>
  axios
    .post('https://localhost:5001/api/budgets', { ...budget, userId: 1 })
    .then((res: AxiosResponse) => res.data);

export const getRecommendedBudgets = () =>
  axios
    .get('https://localhost:5001/api/recommended-budgets', {
      params: { userId: 1 },
    })
    .then((res: GetBudgetsResponse) => res.data);
