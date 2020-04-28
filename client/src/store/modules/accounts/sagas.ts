import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { toDictionary } from 'utils/parsers';
import * as actions from './actions';
import * as globalActions from '../global/actions';
import {
  getAccounts,
  deleteAccount,
  createAccount,
  editAccount,
} from './requests';
import {
  GET_ACCOUNTS,
  AccountType,
  DELETE_ACCOUNT,
  CREATE_ACCOUNT,
  EDIT_ACCOUNT,
} from './types';

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

function* createAccountSaga(action: ReturnType<typeof actions.createAccount>) {
  const account: AccountType = yield call(() => {
    if (action.payload) {
      return createAccount(action.payload.accountForm);
    }
    return null;
  });
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
    const status: number = yield call(() =>
      deleteAccount(action.payload as number)
    );
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
    const account: AccountType = yield call(() => {
      if (action.payload) {
        return editAccount(action.payload.accountForm);
      }
      return null;
    });
    if (account) {
      yield put(actions.storeAddAccount(account));
      if (action.payload) {
        yield call(action.payload.callback);
      }
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
    if (action.payload) {
      yield call(action.payload.callback);
    }
    yield put(actions.unsetAccountEditId());
  }
}

function* editAccountWatcher() {
  yield takeEvery(EDIT_ACCOUNT, editAccountSaga);
}

// Combine all watchers to work on parallel with fork for exporting.
function* rootSaga() {
  yield all([
    fork(getAccountsWatcher),
    fork(deleteAccountWatcher),
    fork(createAccountWatcher),
    fork(editAccountWatcher),
  ]);
}

export default rootSaga;
