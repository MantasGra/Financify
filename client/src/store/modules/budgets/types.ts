import { Dictionary } from 'utils/types';
import { TransactionCategories } from '../transactions';

export interface Budget {
  id: number;
  category: TransactionCategories;
  dateFrom: Date;
  dateTo: Date;
  status: BudgetStatus;
  amount: number;
  usedAmount?: number;
}

export enum BudgetStatus {
  'Almost there',
  'At threshold',
  'Under',
  'Undefined',
  'Over',
}

export interface BudgetFormType {
  amount: number;
  category: TransactionCategories;
  dateFrom: Date;
  dateTo: Date;
}

export interface BudgetFormErrors {
  amount: string;
  category: string;
  dateFrom: string;
  dateTo: string;
}

export interface BudgetsState {
  budgets: Dictionary<Budget>;
  errors: BudgetFormErrors;
  recommendedBudgets: Dictionary<Budget>;
}

// Define action names
export const GET_BUDGETS = 'budgets/GET_BUDGETS';
export const SET_BUDGETS = 'budgets/SET_BUDGETS';
export const SET_BUDGET_FORM_ERRORS = 'budgets/SET_BUDGET_FORM_ERRORS';
export const CLEAR_BUDGET_FORM_ERRORS = 'budgets/CLEAR_BUDGET_FORM_ERRORS';
export const CREATE_BUDGET = 'budgets/CREATE_BUDGET';
export const STORE_ADD_BUDGET = 'budgets/STORE_ADD_BUDGET';
export const GET_RECOMMENDED_BUDGETS = 'budgets/GET_RECOMMENDED_BUDGETS';
export const SET_RECOMMENDED_BUDGETS = 'budgets/SET_RECOMMENDED_BUDGETS';
