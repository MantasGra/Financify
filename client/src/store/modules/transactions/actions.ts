import { createAction } from '../../actions';
import { Transaction, SET_TRANSACTIONS, GET_TRANSACTIONS, SET_MODAL, SET_EDIT_ID, SET_MORE_ID } from './types';

// Define action creators
export const setModalOpen = createAction<boolean>(SET_MODAL);
export const setTransactions = createAction<Transaction>(SET_TRANSACTIONS);
export const getTransactions = createAction(GET_TRANSACTIONS);
export const setEditTransactionsId = createAction<number>(SET_EDIT_ID);
export const setMoreTransactionsId = createAction<number>(SET_MORE_ID);
// Define action types (nest through "|")
export type TransactionAction =
  | ReturnType<typeof setTransactions>
  | ReturnType<typeof setModalOpen>
  | ReturnType<typeof setEditTransactionsId>
  | ReturnType<typeof setMoreTransactionsId>
  | ReturnType<typeof getTransactions>;
