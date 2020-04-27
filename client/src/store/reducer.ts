import { combineReducers } from 'redux';
import exampleReducer from './modules/example/reducer';
import accountsReducer from './modules/accounts/reducer';
import globalReducer from './modules/global/reducer';

// Combine all reducers from different modules, create an object with all reducers and pass it to the function.
const reducer = combineReducers({
  example: exampleReducer,
  account: accountsReducer,
  globals: globalReducer,
});

export default reducer;
