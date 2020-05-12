/* eslint @typescript-eslint/indent: 0 */
import { Dictionary } from 'utils/types';
import { createAction } from '../../actions';
import {
  Transaction,
  TransactionForm,
  EDIT_TRANSACTION,
  STORE_ADD_TRANSACTION,
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  STORE_DELETE_TRANSACTION,
  SET_DELETE_ID,
  SET_TRANSACTIONS,
  GET_TRANSACTIONS,
  SET_MODAL,
  SET_EDIT_ID,
  SET_TRANSACTION_FORM_ERRORS,
  CLEAR_TRANSACTION_FORM_ERRORS,
} from './types';

// Define action creators
export const setModalOpen = createAction<boolean, typeof SET_MODAL>(SET_MODAL);
export const setTransactions = createAction<
  Dictionary<Transaction>,
  typeof SET_TRANSACTIONS
>(SET_TRANSACTIONS);
export const getTransactions = createAction<void, typeof GET_TRANSACTIONS>(
  GET_TRANSACTIONS
);
export const setEditTransactionId = createAction<number, typeof SET_EDIT_ID>(
  SET_EDIT_ID
);

export const deleteTransaction = createAction<
  number,
  typeof DELETE_TRANSACTION
>(DELETE_TRANSACTION);
export const storeDeleteTransaction = createAction<
  number,
  typeof STORE_DELETE_TRANSACTION
>(STORE_DELETE_TRANSACTION);
export const setDeleteId = createAction<number, typeof SET_DELETE_ID>(
  SET_DELETE_ID
);

export const clearTransactionFormErrors = createAction<
  void,
  typeof CLEAR_TRANSACTION_FORM_ERRORS
>(CLEAR_TRANSACTION_FORM_ERRORS);
export const setTransactionFormErrors = createAction<
  {
    prop: string;
    error: string;
  },
  typeof SET_TRANSACTION_FORM_ERRORS
>(SET_TRANSACTION_FORM_ERRORS);

export const createTransaction = createAction<
  {
    transactionForm: TransactionForm;
    callback: () => void;
  },
  typeof CREATE_TRANSACTION
>(CREATE_TRANSACTION);
export const storeAddTransaction = createAction<
  Transaction,
  typeof STORE_ADD_TRANSACTION
>(STORE_ADD_TRANSACTION);

export const editTransaction = createAction<
  {
    transactionForm: TransactionForm;
    callback: () => void;
  },
  typeof EDIT_TRANSACTION
>(EDIT_TRANSACTION);

// Define action types (nest through "|")
export type TransactionAction =
  | ReturnType<typeof setTransactions>
  | ReturnType<typeof setModalOpen>
  | ReturnType<typeof setEditTransactionId>
  | ReturnType<typeof getTransactions>
  | ReturnType<typeof setDeleteId>
  | ReturnType<typeof deleteTransaction>
  | ReturnType<typeof storeDeleteTransaction>
  | ReturnType<typeof createTransaction>
  | ReturnType<typeof storeAddTransaction>
  | ReturnType<typeof setTransactionFormErrors>
  | ReturnType<typeof clearTransactionFormErrors>
  | ReturnType<typeof editTransaction>;
