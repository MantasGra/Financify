import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import { State as AppState } from './types';
import saga from './saga';

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(saga);

// This is a workaround before typescript 3.8 is supported by eslint.
export type State = AppState;

export default store;
