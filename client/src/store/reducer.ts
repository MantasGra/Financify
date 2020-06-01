import { combineReducers } from 'redux';
import accountsReducer from './modules/accounts/reducer';
import globalReducer from './modules/global/reducer';
import transactionsReducer from './modules/transactions/reducer';
import reportsReducer from './modules/reports/reducer';
import currencySubscriptionReducer from './modules/currencySubscriptions/reducer';

// Combine all reducers from different modules, create an object with all reducers and pass it to the function.
const reducer = combineReducers({
  account: accountsReducer,
  transactions: transactionsReducer,
  reports: reportsReducer,
  globals: globalReducer,
  currencySubscription: currencySubscriptionReducer,
});

export default reducer;
