import { combineReducers } from 'redux';
import exampleReducer from './modules/example/reducer';
import transactionsReducer from './modules/transactions/reducer';

// Combine all reducers from different modules, create an object with all reducers and pass it to the function.
const reducer = combineReducers({
  example: exampleReducer,
  transactions: transactionsReducer,
});

export default reducer;
