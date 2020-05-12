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
import {
  getAccounts,
  deleteAccount,
  createAccount,
  editAccount,
  getSelectOptions,
} from './requests';
import {
  GET_ACCOUNTS,
  Account,
  DELETE_ACCOUNT,
  CREATE_ACCOUNT,
  EDIT_ACCOUNT,
  AccountSelectOption,
  GET_ACCOUNT_SELECT_OPTIONS,
} from './types';

// The function* syntax is required here, because sagas are based on generator functions.

// Actual worker saga which does something, when an action is dispatched.
function* getAccountsSaga() {
  const accounts: Account[] = yield call(getAccounts);
  yield put(actions.setAccounts(toDictionary(accounts, 'id')));
}

// Watcher saga which watches for dispatched actions.
function* getAccountsWatcher() {
  yield takeEvery(GET_ACCOUNTS, getAccountsSaga);
}

function* createAccountSaga(action: ReturnType<typeof actions.createAccount>) {
  const account: Account = yield call(
    createAccount,
    action.payload.accountForm
  );
  if (account) {
    yield put(actions.storeAddAccount(account));
    if (action.payload) {
      yield call(action.payload.callback);
    }
    yield put(
      globalActions.setSnackbar({
        severity: 'success',
        text: 'Account succesfully created',
        isOpen: true,
      })
    );
  }
}

function* createAccountWatcher() {
  yield takeEvery(CREATE_ACCOUNT, createAccountSaga);
}

function* deleteAccountSaga(action: ReturnType<typeof actions.deleteAccount>) {
  try {
    const status: number = yield call(deleteAccount, action.payload);
    if (status === 200) {
      yield put(actions.storeDeleteAccount(action.payload));
      yield put(actions.setModalOpen(false));
      yield put(
        globalActions.setSnackbar({
          severity: 'success',
          text: 'Account deleted successfully',
          isOpen: true,
        })
      );
    }
  } catch (e) {
    yield put(actions.setModalOpen(false));
    yield put(
      globalActions.setSnackbar({
        severity: 'error',
        text: 'There was something wrong',
        isOpen: true,
      })
    );
  }
}

function* deleteAccountWatcher() {
  yield takeEvery(DELETE_ACCOUNT, deleteAccountSaga);
}

function* editAccountSaga(action: ReturnType<typeof actions.editAccount>) {
  try {
    const account: Account = yield call(
      editAccount,
      action.payload.accountForm
    );
    if (account) {
      yield put(actions.storeAddAccount(account));
      yield call(action.payload.callback);
      yield put(actions.unsetAccountEditId());
      yield put(
        globalActions.setSnackbar({
          severity: 'success',
          text: 'Account succesfully updated',
          isOpen: true,
        })
      );
    }
  } catch (e) {
    yield put(
      globalActions.setSnackbar({
        severity: 'error',
        text: 'Something went wrong',
        isOpen: true,
      })
    );
    yield call(action.payload.callback);
    yield put(actions.unsetAccountEditId());
  }
}

function* editAccountWatcher() {
  yield takeEvery(EDIT_ACCOUNT, editAccountSaga);
}

function* getSelectOptionsSaga(
  action: ReturnType<typeof actions.getAccountSelectOptions>
) {
  const selectOptions: AccountSelectOption[] = yield call(
    getSelectOptions,
    action.payload
  );
  yield put(actions.setAccountSelectOptions(selectOptions));
}

function* getSelectOptionsWatcher() {
  yield takeLatest(GET_ACCOUNT_SELECT_OPTIONS, getSelectOptionsSaga);
}

// Combine all watchers to work on parallel with fork for exporting.
function* rootSaga() {
  yield all([
    fork(getAccountsWatcher),
    fork(deleteAccountWatcher),
    fork(createAccountWatcher),
    fork(editAccountWatcher),
    fork(getSelectOptionsWatcher),
  ]);
}

export default rootSaga;
