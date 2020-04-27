import { createAction } from '../../actions';
import {
  Transaction,
  TransactionFormType,
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
  SET_MORE_ID,
  SET_TRANSACTION_FORM_ERRORS,
  CLEAR_TRANSACTION_FORM_ERRORS,
} from './types';

// Define action creators
export const setModalOpen = createAction<boolean>(SET_MODAL);
export const setTransactions = createAction<Transaction>(SET_TRANSACTIONS);
export const getTransactions = createAction(GET_TRANSACTIONS);
export const setEditTransactionsId = createAction<number>(SET_EDIT_ID);
export const setMoreTransactionsId = createAction<number>(SET_MORE_ID);

export const deleteTransaction = createAction<number>(DELETE_TRANSACTION);
export const storeDeleteTransaction = createAction<number>(STORE_DELETE_TRANSACTION);
export const setDeleteId = createAction(SET_DELETE_ID);


export const clearTransactionFormErrors = createAction(CLEAR_TRANSACTION_FORM_ERRORS);
export const setTransactionFormErrors = createAction<{
  prop: string;
  error: string;
}>(SET_TRANSACTION_FORM_ERRORS);

export const createTransaction = createAction<{
  transactionForm: TransactionFormType;
  callback: () => void;
}>(CREATE_TRANSACTION);
export const storeAddTransaction = createAction<Transaction>(STORE_ADD_TRANSACTION);

export const editTransaction = createAction<{
  transactionForm: Transaction;
  callback: () => void;
}>(EDIT_TRANSACTION);

// Define action types (nest through "|")
export type TransactionAction =
  | ReturnType<typeof setTransactions>
  | ReturnType<typeof setModalOpen>
  | ReturnType<typeof setEditTransactionsId>
  | ReturnType<typeof setMoreTransactionsId>
  | ReturnType<typeof getTransactions>
  | ReturnType<typeof setDeleteId>
  | ReturnType<typeof deleteTransaction>
  | ReturnType<typeof storeDeleteTransaction>
  | ReturnType<typeof createTransaction>
  | ReturnType<typeof storeAddTransaction>
  | ReturnType<typeof setTransactionFormErrors>
  | ReturnType<typeof clearTransactionFormErrors>
  | ReturnType<typeof editTransaction>;

