import {AccountType} from '../accounts/types'

// Define types for different objects
export interface Transaction {
  id: number;
  amount: number;
  date: Date;
  category: TransactionCategories;
  description: string;
  disabled: boolean;
  account: AccountType;
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

export interface TransactionFormType {
  amount?: number;
  date: Date;
  category: TransactionCategories;
  description: string;
  accountId: number;
}

// Define type for state of a given module
export interface TransactionState {
  transactions: Transaction[];
  isModalOpen: boolean;
  editTransactionId : number;
  moreTransactionId : number;
  deleteId?: number;
}

// Define action names
export const SET_TRANSACTIONS = 'transactions/SET_TRANSACTIONS';
export const GET_TRANSACTIONS = 'transactions/GET_TRANSACTIONS';
export const SET_MODAL = 'transactions/SET_MODAL';
export const SET_EDIT_ID = 'transactions/SET_EDIT_ID'
export const SET_MORE_ID = 'transactions/SET_MORE_ID'

export const DELETE_TRANSACTION = 'transactions/DELETE_TRANSACTION';
export const STORE_DELETE_TRANSACTION = 'transactions/STORE_DELETE_TRANSACTION';
export const SET_DELETE_ID = 'transactions/STORE_SET_DELETE_ID';
export const CREATE_TRANSACTION = 'transactions/CREATE_TRANSACTION';
export const STORE_ADD_TRANSACTION = 'transactions/STORE_ADD_TRANSACTION';
export const EDIT_TRANSACTION = 'transactions/EDIT_TRANSACTION';
// Define action name types (multiple types should be nested through "|")
export type TransactionActionType =
  | typeof SET_TRANSACTIONS
  | typeof SET_MODAL
  | typeof SET_EDIT_ID
  | typeof SET_MORE_ID
  | typeof GET_TRANSACTIONS
  | typeof DELETE_TRANSACTION
  | typeof STORE_DELETE_TRANSACTION
  | typeof SET_DELETE_ID
  | typeof CREATE_TRANSACTION
  | typeof STORE_ADD_TRANSACTION
  | typeof EDIT_TRANSACTION;
