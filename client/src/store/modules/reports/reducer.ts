import { ReportsState, SET_TENDENCIES, SET_EXPENSES_REPORT } from './types';
import { TendenciesAction } from './actions';

const initialState: ReportsState = {
  tendencies: {},
  expensesReport: [],
};

// Reducer should be extended with cases as needed and should always return a state object.
const reducer = (
  state = initialState,
  action: TendenciesAction
): ReportsState => {
  switch (action.type) {
    case SET_TENDENCIES:
      return {
        ...state,
        tendencies: action.payload,
      };
    case SET_EXPENSES_REPORT:
      return {
        ...state,
        expensesReport: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
