import { Dictionary } from 'utils/types';

// Define types for different objects
export interface Account {
  id: number;
  name: string;
  type: AccountTypes;
}

// Define type for state of a given module
export interface AccountsState {
  accounts: Dictionary<Account>;
  isModalOpen: boolean;
  deleteId?: number;
  errors: AccountFormErrors;
  editId?: number;
  selectOptions: AccountSelectOption[];
  eliminationErrors: EliminationFormErrors;
}

export interface EliminationForm {
  accountId: number;
  newValue:number;
}
export interface EliminationFormErrors {
  accountId: string;
  newValue: string;
}



export interface AccountFormType {
  name: string;
  type: AccountTypes;
}

export interface AccountFormErrors {
  name: string;
  type: string;
}

export interface AccountSelectOption {
  label: string;
  id: number;
}

export enum AccountTypes {
  'Cash',
  'Debit Card',
  'EWallet',
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
export const UNSET_ACCOUNT_EDIT_ID = 'accounts/UNSET_ACCOUNT_EDIT_ID';
export const GET_ACCOUNT_SELECT_OPTIONS = 'accounts/GET_ACCOUNT_SELECT_OPTIONS';
export const SET_ACCOUNT_SELECT_OPTIONS = 'accounts/SET_ACCOUNT_SELECT_OPTIONS';
export const CREATE_ELIMINATING_TRANSACTION = 'accounts/CREATE_ELIMINATING_TRANSACTION';
export const CLEAR_ELIMINATION_FORM_ERRORS = 'accounts/CLEAR_ELIMINATION_FORM_ERRORS';
export const SET_ELIMINATION_FORM_ERRORS = 'accounts/SET_ELIMINATION_FORM_ERRORS';
