import { Dictionary } from 'utils/types';
import { Account } from '../accounts/types';

// Define types for different objects
export interface Transaction {
  id: number;
  amount: number;
  date: Date;
  category: TransactionCategories;
  description: string;
  disabled: boolean;
  account: Account;
}

export enum TransactionCategories {
  Food,
  Shopping,
  Travel,
  Savings,
  Transport,
  Salary,
  Bills,
  Fuel,
  Gifts,
  Holidays,
  Other,
}

export interface TransactionForm {
  id?: number;
  amount: number;
  date: Date;
  category: TransactionCategories;
  description: string;
  accountId: number;
}

// Define type for state of a given module
export interface TransactionState {
  transactions: Dictionary<Transaction>;
  isModalOpen: boolean;
  editTransactionId: number;
  deleteId?: number;
  errors: TransactionFormErrors;
}

export interface TransactionFormErrors {
  name: string;
  type: string;
}

// Define action names
export const SET_TRANSACTIONS = 'transactions/SET_TRANSACTIONS';
export const GET_TRANSACTIONS = 'transactions/GET_TRANSACTIONS';
export const SET_MODAL = 'transactions/SET_MODAL';
export const SET_EDIT_ID = 'transactions/SET_EDIT_ID';

export const SET_TRANSACTION_FORM_ERRORS =
  'accounts/SET_TRANSACTION_FORM_ERRORS';
export const CLEAR_TRANSACTION_FORM_ERRORS =
  'accounts/CLEAR_TRANSACTION_FORM_ERRORS';

export const DELETE_TRANSACTION = 'transactions/DELETE_TRANSACTION';
export const STORE_DELETE_TRANSACTION = 'transactions/STORE_DELETE_TRANSACTION';
export const SET_DELETE_ID = 'transactions/STORE_SET_DELETE_ID';
export const CREATE_TRANSACTION = 'transactions/CREATE_TRANSACTION';
export const STORE_ADD_TRANSACTION = 'transactions/STORE_ADD_TRANSACTION';
export const EDIT_TRANSACTION = 'transactions/EDIT_TRANSACTION';
