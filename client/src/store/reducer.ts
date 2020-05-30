import { combineReducers } from 'redux';
import accountsReducer from './modules/accounts/reducer';
import globalReducer from './modules/global/reducer';
import transactionsReducer from './modules/transactions/reducer';
import tendenciesReducer from './modules/tendencies/reducer';
// Combine all reducers from different modules, create an object with all reducers and pass it to the function.
const reducer = combineReducers({
  account: accountsReducer,
  transactions: transactionsReducer,
  tendencies: tendenciesReducer,
  globals: globalReducer,
});

export default reducer;
