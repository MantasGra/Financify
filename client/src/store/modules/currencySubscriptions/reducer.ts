import { CurrencySubscriptionsState, SET_CURRENCY_SUBSCRIPTIONS } from './types';
import { CurrencySubscriptionsActionType } from './actions';

const initialState: CurrencySubscriptionsState = {
  currencySubscriptions: {},
};

const reducer = (
  state = initialState,
  action: CurrencySubscriptionsActionType
): CurrencySubscriptionsState => {
  switch(action.type) {
    case SET_CURRENCY_SUBSCRIPTIONS: {
      return {
        ...state,
        currencySubscriptions: action.payload,
      };
    }
    default:{
      return state;
    }
  }
};

export default reducer;