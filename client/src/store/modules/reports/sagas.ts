import {
  all,
  call,
  fork,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { toDictionary } from 'utils/parsers';
import * as actions from './actions';
import {
  getTendencies,
} from './requests';
import {
  GET_TENDENCIES,
  Tendency,
} from './types';

// The function* syntax is required here, because sagas are based on generator functions.

// Actual worker saga which does something, when an action is dispatched.
function* getTendenciesSaga() {
  const tendencies: Tendency[] = yield call(getTendencies);
  yield put(actions.setTendencies(toDictionary(tendencies, 'date')));
}

// Watcher saga which watches for dispatched actions.
function* getTendenciesWatcher() {
  yield takeEvery(GET_TENDENCIES, getTendenciesSaga);
}

// Combine all watchers to work on parallel with fork for exporting.
function* rootSaga() {
  yield all([
    fork(getTendenciesWatcher),
  ]);
}

export default rootSaga;
