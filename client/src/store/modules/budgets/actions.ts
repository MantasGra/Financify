// Disabling because of conflict with prettier, formatting code takes care of indenting
/* eslint @typescript-eslint/indent: 0 */
import { Dictionary } from 'utils/types';
import { createAction } from '../../actions';
import { Budget, GET_BUDGETS, SET_BUDGETS } from './types';

// Define action creators

export const getBudgets = createAction<void, typeof GET_BUDGETS>(GET_BUDGETS);
export const setBudgets = createAction<Dictionary<Budget>, typeof SET_BUDGETS>(
  SET_BUDGETS
);
// Define action types (nest through "|")
export type BudgetsActionType =
  | ReturnType<typeof getBudgets>
  | ReturnType<typeof setBudgets>;
