// Define types for different objects
export interface Transaction {
  id: number;
  amount: number;
  date: Date;
  category: TransactionCategories;
  description: string;
  disabled: boolean;
  account: any;
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
}

// Define action names
export const SET_TRANSACTIONS = 'transactions/SET_TRANSACTIONS';
export const GET_TRANSACTIONS = 'transactions/GET_TRANSACTIONS';

// Define action name types (multiple types should be nested through "|")
export type TransactionActionType =
  | typeof SET_TRANSACTIONS
  | typeof GET_TRANSACTIONS;
