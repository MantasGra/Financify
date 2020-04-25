import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';
import { State as AppState } from './types';
import saga from './saga';

const sagaMiddleWare = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);
/* eslint-enable */
sagaMiddleWare.run(saga);

// This is a workaround before typescript 3.8 is supported by eslint.
export type State = AppState;

export default store;
