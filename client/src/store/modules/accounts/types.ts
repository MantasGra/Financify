import { Dictionary } from 'utils/types';

// Define types for different objects
export interface AccountType {
  id: string;
  title: string;
  type: string;
}

// Define type for state of a given module
export interface AccountsState {
  accounts: Dictionary<AccountType>;
  isModalOpen: boolean;
}

export enum AccountTypes {
  'Cash',
  'Debit Card',
  'Online Account',
}

// Define action names
export const GET_ACCOUNTS = 'accounts/GET_ACCOUNTS';
export const SET_ACCOUNTS = 'accounts/SET_ACCOUNTS';
export const SET_MODAL = 'accounts/SET_MODAL';
// Define action name types (multiple types should be nested through "|")
export type AccountActionNameType = typeof GET_ACCOUNTS | typeof SET_ACCOUNTS;
