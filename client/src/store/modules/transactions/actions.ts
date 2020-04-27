import { createAction } from '../../actions';
import { Transaction, SET_TRANSACTIONS, GET_TRANSACTIONS, SET_MODAL } from './types';

// Define action creators
export const setModalOpen = createAction<boolean>(SET_MODAL);
export const setTransactions = createAction<Transaction>(SET_TRANSACTIONS);
export const getTransactions = createAction(GET_TRANSACTIONS);

// Define action types (nest through "|")
export type TransactionAction =
  | ReturnType<typeof setTransactions>
  | ReturnType<typeof setModalOpen>
  | ReturnType<typeof getTransactions>;
