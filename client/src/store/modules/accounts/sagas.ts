import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { toDictionary } from 'utils/parsers';
import * as actions from './actions';
import { getAccounts } from './requests';
import { GET_ACCOUNTS, AccountType } from './types';

// The function* syntax is required here, because sagas are based on generator functions.

// Actual worker saga which does something, when an action is dispatched.
function* getAccountsSaga() {
  const accounts: AccountType[] = yield call(getAccounts);
  yield put(actions.setAccounts(toDictionary(accounts, 'id')));
}

// Watcher saga which watches for dispatched actions.
function* getAccountsWatcher() {
  yield takeEvery(GET_ACCOUNTS, getAccountsSaga);
}

// Combine all watchers to work on parallel with fork for exporting.
function* rootSaga() {
  yield all([fork(getAccountsWatcher)]);
}

export default rootSaga;
