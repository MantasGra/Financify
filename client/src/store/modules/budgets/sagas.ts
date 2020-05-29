import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { toDictionary } from 'utils/parsers';
import * as actions from './actions';
import * as globalActions from '../global/actions';
import { getBudgets } from './requests';
import { GET_BUDGETS, Budget } from './types';

// The function* syntax is required here, because sagas are based on generator functions.

// Actual worker saga which does something, when an action is dispatched.
function* getBudgetsSaga() {
  const budgets: Budget[] = yield call(getBudgets);
  yield put(actions.setBudgets(toDictionary(budgets, 'id')));
}

// Watcher saga which watches for dispatched actions.
function* getBudgetsWatcher() {
  yield takeEvery(GET_BUDGETS, getBudgetsSaga);
}

// Combine all watchers to work on parallel with fork for exporting.
function* rootSaga() {
  yield all([fork(getBudgetsWatcher)]);
}

export default rootSaga;
