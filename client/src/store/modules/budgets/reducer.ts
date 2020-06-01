import {
  BudgetsState,
  SET_BUDGETS,
  SET_BUDGET_FORM_ERRORS,
  CLEAR_BUDGET_FORM_ERRORS,
  STORE_ADD_BUDGET,
  SET_RECOMMENDED_BUDGETS,
} from './types';
import { BudgetsActionType } from './actions';

const initialState: BudgetsState = {
  budgets: {},
  errors: { amount: '', category: '', dateFrom: '', dateTo: '' },
  recommendedBudgets: {},
};

// Reducer should be extended with cases as needed and should always return a state object.
const reducer = (
  state = initialState,
  action: BudgetsActionType
): BudgetsState => {
  switch (action.type) {
    case SET_BUDGETS:
      return {
        ...state,
        budgets: action.payload,
      };
    case SET_BUDGET_FORM_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.prop]: action.payload.error,
        },
      };
    case CLEAR_BUDGET_FORM_ERRORS:
      return {
        ...state,
        errors: { amount: '', category: '', dateFrom: '', dateTo: '' },
      };
    case STORE_ADD_BUDGET:
      return {
        ...state,
        budgets: { ...state.budgets, [action.payload.id]: action.payload },
      };
    case SET_RECOMMENDED_BUDGETS:
      return {
        ...state,
        recommendedBudgets: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
