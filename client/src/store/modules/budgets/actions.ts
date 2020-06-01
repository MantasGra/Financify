// Disabling because of conflict with prettier, formatting code takes care of indenting
/* eslint @typescript-eslint/indent: 0 */
import { Dictionary } from 'utils/types';
import { createAction } from '../../actions';
import {
  Budget,
  GET_BUDGETS,
  SET_BUDGETS,
  SET_BUDGET_FORM_ERRORS,
  CLEAR_BUDGET_FORM_ERRORS,
  CREATE_BUDGET,
  STORE_ADD_BUDGET,
  GET_RECOMMENDED_BUDGETS,
  SET_RECOMMENDED_BUDGETS,
  BudgetFormType,
} from './types';

// Define action creators

export const getBudgets = createAction<void, typeof GET_BUDGETS>(GET_BUDGETS);
export const setBudgets = createAction<Dictionary<Budget>, typeof SET_BUDGETS>(
  SET_BUDGETS
);

export const setBudgetFormErrors = createAction<
  {
    prop: string;
    error: string;
  },
  typeof SET_BUDGET_FORM_ERRORS
>(SET_BUDGET_FORM_ERRORS);

export const clearBudgetFormErrors = createAction<
  void,
  typeof CLEAR_BUDGET_FORM_ERRORS
>(CLEAR_BUDGET_FORM_ERRORS);

export const createBudget = createAction<
  {
    budgetForm: BudgetFormType;
    callback: () => void;
  },
  typeof CREATE_BUDGET
>(CREATE_BUDGET);

export const storeAddBudget = createAction<Budget, typeof STORE_ADD_BUDGET>(
  STORE_ADD_BUDGET
);

export const getRecommendedBudgets = createAction<
  void,
  typeof GET_RECOMMENDED_BUDGETS
>(GET_RECOMMENDED_BUDGETS);

export const setRecommendedBudgets = createAction<
  Dictionary<Budget>,
  typeof SET_RECOMMENDED_BUDGETS
>(SET_RECOMMENDED_BUDGETS);

// Define action types (nest through "|")
export type BudgetsActionType =
  | ReturnType<typeof getBudgets>
  | ReturnType<typeof setBudgets>
  | ReturnType<typeof setBudgetFormErrors>
  | ReturnType<typeof clearBudgetFormErrors>
  | ReturnType<typeof createBudget>
  | ReturnType<typeof storeAddBudget>
  | ReturnType<typeof getRecommendedBudgets>
  | ReturnType<typeof setRecommendedBudgets>;
