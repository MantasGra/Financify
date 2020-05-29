import { CurrencySubscriptionsState, SET_CURRENCY_SUBSCRIPTIONS, STORE_ADD_CURRENCY_SUBSCRIPTION, SET_CURRENCY_SUBSCRIPTION_FORM_ERRORS, CLEAR_CURRENCY_SUBSCRIPTION_FORM_ERRORS } from './types';
import { CurrencySubscriptionsActionType } from './actions';

const initialState: CurrencySubscriptionsState = {
  currencySubscriptions: {},
  errors: {
    currency: '',
  },
};

const reducer = (
  state = initialState,
  action: CurrencySubscriptionsActionType
): CurrencySubscriptionsState => {
  switch(action.type) {
    case SET_CURRENCY_SUBSCRIPTIONS:
      return {
        ...state,
        currencySubscriptions: action.payload,
      };
    case STORE_ADD_CURRENCY_SUBSCRIPTION:
      return {
        ...state,
        currencySubscriptions: {
          ...state.currencySubscriptions,
          [action.payload.id]: action.payload
        },
      };
    case SET_CURRENCY_SUBSCRIPTION_FORM_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.prop]: action.payload.error,
        },
      };
    case CLEAR_CURRENCY_SUBSCRIPTION_FORM_ERRORS:
      return {
        ...state,
        errors: { currency: '' },
      };
    default:
      return state;
  }
};

export default reducer;