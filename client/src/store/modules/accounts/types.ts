import { Dictionary } from 'utils/types';

// Define types for different objects
export interface AccountType {
  id: number;
  name: string;
  type: AccountTypes;
}

// Define type for state of a given module
export interface AccountsState {
  accounts: Dictionary<AccountType>;
  isModalOpen: boolean;
  deleteId?: number;
  errors: AccountFormErrors;
  editId?: number;
}

export interface AccountFormType {
  name: string;
  type: AccountTypes;
}

export interface AccountFormErrors {
  name: string;
  type: string;
}

export enum AccountTypes {
  'Cash' = 0,
  'Debit Card' = 1,
  'EWallet' = 2,
}

// Define action names
export const GET_ACCOUNTS = 'accounts/GET_ACCOUNTS';
export const SET_ACCOUNTS = 'accounts/SET_ACCOUNTS';
export const SET_MODAL = 'accounts/SET_MODAL';
export const DELETE_ACCOUNT = 'accounts/DELETE_ACCOUNT';
export const STORE_DELETE_ACCOUNT = 'accounts/STORE_DELETE_ACCOUNT';
export const SET_DELETE_ID = 'accounts/STORE_SET_DELETE_ID';
export const CREATE_ACCOUNT = 'accounts/CREATE_ACCOUNT';
export const STORE_ADD_ACCOUNT = 'accounts/STORE_ADD_ACCOUNT';
export const SET_ACCOUNT_FORM_ERRORS = 'accounts/SET_ACCOUNT_FORM_ERRORS';
export const CLEAR_ACCOUNT_FORM_ERRORS = 'accounts/CLEAR_ACCOUNT_FORM_ERRORS';
export const EDIT_ACCOUNT = 'accounts/EDIT_ACCOUNT';
export const SET_ACCOUNT_EDIT_ID = 'accounts/SET_ACCOUNT_EDIT_ID';
// Define action name types (multiple types should be nested through "|")
export type AccountActionNameType =
  | typeof GET_ACCOUNTS
  | typeof SET_ACCOUNTS
  | typeof SET_MODAL
  | typeof DELETE_ACCOUNT
  | typeof STORE_DELETE_ACCOUNT
  | typeof SET_DELETE_ID
  | typeof STORE_ADD_ACCOUNT
  | typeof SET_ACCOUNT_FORM_ERRORS
  | typeof CLEAR_ACCOUNT_FORM_ERRORS
  | typeof SET_ACCOUNT_EDIT_ID
  | typeof EDIT_ACCOUNT
  | typeof CREATE_ACCOUNT;
