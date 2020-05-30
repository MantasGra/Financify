import { Dictionary } from 'utils/types';
import { TransactionCategories } from '../transactions';

export interface Budget {
  id: number;
  category: TransactionCategories;
  dateFrom: string;
  dateTo: string;
  status: BudgetStatus;
  amount: number;
  usedAmount: number;
}

export enum BudgetStatus {
  'Almost there',
  'At threshold',
  'Under',
  'Undefined',
  'Over',
}

export interface BudgetsState {
  budgets: Dictionary<Budget>;
}

// Define action names
export const GET_BUDGETS = 'budgets/GET_BUDGETS';
export const SET_BUDGETS = 'budgets/SET_BUDGETS';
