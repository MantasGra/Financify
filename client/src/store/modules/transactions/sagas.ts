import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';
import { getTransactions } from './requests';
import { GET_TRANSACTIONS, Transaction } from './types';

// The function* syntax is required here, because sagas are based on generator functions.

// Actual worker saga which does something, when an action is dispatched.
function* getTransactionsSaga() {
  const fact: Transaction = yield call(getTransactions);
  yield put(actions.setTransactions(fact));
}

// Watcher saga which watches for dispatched actions.
function* getTransactionsWatcher() {
  yield takeEvery(GET_TRANSACTIONS, getTransactionsSaga);
}

// Combine all watchers to work on parallel with fork for exporting.
function* rootSaga() {
  yield all([fork(getTransactionsWatcher)]);
}

export default rootSaga;
