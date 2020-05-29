import { toDictionary } from 'utils/parsers';
import { BudgetsState, SET_BUDGETS } from './types';
import { BudgetsActionType } from './actions';

const initialState: BudgetsState = {
  budgets: {},
};

// Reducer should be extended with cases as needed and should always return a state object.
const reducer = (
  state = initialState,
  action: BudgetsActionType
): BudgetsState => {
  switch (action.type) {
    case SET_BUDGETS:
      console.log(action);
      return {
        ...state,
        budgets: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
