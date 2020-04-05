import { combineReducers } from 'redux';
import exampleReducer from './modules/example/reducer';

// Combine all reducers from different modules, create an object with all reducers and pass it to the function.
const reducer = combineReducers({ example: exampleReducer });

export default reducer;
