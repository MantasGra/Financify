import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import { getTendencies, getExpensesReport } from './requests';
import {
  GET_TENDENCIES,
  Tendency,
  GET_EXPENSES_REPORT,
  ExpensesReport,
} from './types';

// The function* syntax is required here, because sagas are based on generator functions.

// Actual worker saga which does something, when an action is dispatched.
function* getTendenciesSaga() {
  const tendencies: Tendency[] = yield call(getTendencies);
  yield put(actions.setTendencies(tendencies));
}

// Watcher saga which watches for dispatched actions.
function* getTendenciesWatcher() {
  yield takeEvery(GET_TENDENCIES, getTendenciesSaga);
}

function* getExpensesReportSaga() {
  const expensesReport: ExpensesReport[] = yield call(getExpensesReport);
  yield put(actions.setExpensesReport(expensesReport));
}

function* getExpensesReportWatcher() {
  yield takeEvery(GET_EXPENSES_REPORT, getExpensesReportSaga);
}

// Combine all watchers to work on parallel with fork for exporting.
function* rootSaga() {
  yield all([fork(getTendenciesWatcher), fork(getExpensesReportWatcher)]);
}

export default rootSaga;
