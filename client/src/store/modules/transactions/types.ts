// Define types for different objects
export interface Transaction {
  id: number;
  amount: number;
  date: Date;
  category: TransactionCategories;
  description: string;
  disabled: boolean;
  account: string;
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

// Define type for state of a given module
export interface TransactionState {
  transactions: Transaction[];
  isModalOpen: boolean;
}

// Define action names
export const SET_TRANSACTIONS = 'transactions/SET_TRANSACTIONS';
export const GET_TRANSACTIONS = 'transactions/GET_TRANSACTIONS';
export const SET_MODAL = 'transactions/SET_MODAL';
// Define action name types (multiple types should be nested through "|")
export type TransactionActionType =
  | typeof SET_TRANSACTIONS
  | typeof SET_MODAL
  | typeof GET_TRANSACTIONS;
