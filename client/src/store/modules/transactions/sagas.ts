import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { toDictionary } from 'utils/parsers';
import * as actions from './actions';
import {
  getTransactions,
  createTransaction,
  editTransaction,
  deleteTransaction,
} from './requests';
import {
  DELETE_TRANSACTION,
  GET_TRANSACTIONS,
  EDIT_TRANSACTION,
  Transaction,
  CREATE_TRANSACTION,
} from './types';
import * as globalActions from '../global/actions';
// The function* syntax is required here, because sagas are based on generator functions.

// Actual worker saga which does something, when an action is dispatched.
function* getTransactionsSaga() {
  const transactions: Transaction[] = yield call(getTransactions);
  yield put(actions.setTransactions(toDictionary(transactions, 'id')));
}

// Watcher saga which watches for dispatched actions.
function* getTransactionsWatcher() {
  yield takeEvery(GET_TRANSACTIONS, getTransactionsSaga);
}

// Combine all watchers to work on parallel with fork for exporting.
function* rootSaga() {
  yield all([
    fork(getTransactionsWatcher),
    fork(createTransactionsWatcher),
    fork(editTransactionWatcher),
    fork(deleteAccountWatcher),
  ]);
}

function* createTransactionSaga(
  action: ReturnType<typeof actions.createTransaction>
) {
  const transaction: Transaction = yield call(
    createTransaction,
    action.payload.transactionForm
  );
  if (transaction) {
    yield put(actions.storeAddTransaction(transaction));
    yield call(action.payload.callback);
    yield put(
      globalActions.setSnackbar({
        severity: 'success',
        text: 'Transaction succesfully created',
        isOpen: true,
      })
    );
  }
}

function* createTransactionsWatcher() {
  yield takeEvery(CREATE_TRANSACTION, createTransactionSaga);
}

function* editTransactionSaga(
  action: ReturnType<typeof actions.editTransaction>
) {
  const transaction: Transaction = yield call(
    editTransaction,
    action.payload.transactionForm
  );

  if (transaction) {
    yield put(actions.storeAddTransaction(transaction));
    yield call(action.payload.callback);
    yield put(
      globalActions.setSnackbar({
        severity: 'success',
        text: 'Transaction succesfully updated',
        isOpen: true,
      })
    );
  } else {
    yield put(
      globalActions.setSnackbar({
        severity: 'error',
        text: 'Something went wrong',
        isOpen: true,
      })
    );
  }
}

function* editTransactionWatcher() {
  yield takeEvery(EDIT_TRANSACTION, editTransactionSaga);
}

function* deleteTransactionSaga(
  action: ReturnType<typeof actions.deleteTransaction>
) {
  try {
    const status: number = yield call(deleteTransaction, action.payload);
    if (status === 200) {
      yield put(actions.storeDeleteTransaction(action.payload));
      yield put(actions.setModalOpen(false));
      yield put(
        globalActions.setSnackbar({
          severity: 'success',
          text: 'Transaction deleted successfully',
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
  yield takeEvery(DELETE_TRANSACTION, deleteTransactionSaga);
}

export default rootSaga;
