import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import { getRandomFact } from './requests';
import { GET_RANDOM_FACT } from './types';

// The function* syntax is required here, because sagas are based on generator functions.

// Actual worker saga which does something, when an action is dispatched.
function* getRandomFactSaga() {
  const fact: string = yield call(getRandomFact);
  yield put(actions.setRandomFact(fact));
}

// Watcher saga which watches for dispatched actions.
function* getRandomFactWatcher() {
  yield takeEvery(GET_RANDOM_FACT, getRandomFactSaga);
}

// Combine all watchers to work on parallel with fork for exporting.
function* rootSaga() {
  yield all([fork(getRandomFactWatcher)]);
}

export default rootSaga;
