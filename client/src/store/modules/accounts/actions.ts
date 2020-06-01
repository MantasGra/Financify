// Disabling because of conflict with prettier, formatting code takes care of indenting
/* eslint @typescript-eslint/indent: 0 */
import { Dictionary } from 'utils/types';
import { createAction } from '../../actions';
import {
  Account,
  AccountSelectOption,
  GET_ACCOUNTS,
  SET_ACCOUNTS,
  SET_MODAL,
  DELETE_ACCOUNT,
  STORE_DELETE_ACCOUNT,
  SET_DELETE_ID,
  AccountFormType,
  CREATE_ACCOUNT,
  STORE_ADD_ACCOUNT,
  SET_ACCOUNT_FORM_ERRORS,
  CLEAR_ACCOUNT_FORM_ERRORS,
  SET_ACCOUNT_EDIT_ID,
  UNSET_ACCOUNT_EDIT_ID,
  EDIT_ACCOUNT,
  GET_ACCOUNT_SELECT_OPTIONS,
  SET_ACCOUNT_SELECT_OPTIONS,
  CREATE_ELIMINATING_TRANSACTION,
  EliminationForm,
  CLEAR_ELIMINATION_FORM_ERRORS,
  SET_ELIMINATION_FORM_ERRORS
} from './types';

// Define action creators

export const setModalOpen = createAction<boolean, typeof SET_MODAL>(SET_MODAL);
export const getAccounts = createAction<void, typeof GET_ACCOUNTS>(
  GET_ACCOUNTS
);
export const setAccounts = createAction<
  Dictionary<Account>,
  typeof SET_ACCOUNTS
>(SET_ACCOUNTS);
export const deleteAccount = createAction<number, typeof DELETE_ACCOUNT>(
  DELETE_ACCOUNT
);
export const storeDeleteAccount = createAction<
  number,
  typeof STORE_DELETE_ACCOUNT
>(STORE_DELETE_ACCOUNT);
export const setDeleteId = createAction<number, typeof SET_DELETE_ID>(
  SET_DELETE_ID
);
export const createAccount = createAction<
  {
    accountForm: AccountFormType;
    callback: () => void;
  },
  typeof CREATE_ACCOUNT
>(CREATE_ACCOUNT);
export const storeAddAccount = createAction<Account, typeof STORE_ADD_ACCOUNT>(
  STORE_ADD_ACCOUNT
);
export const clearAccountFormErrors = createAction<
  void,
  typeof CLEAR_ACCOUNT_FORM_ERRORS
>(CLEAR_ACCOUNT_FORM_ERRORS);
export const setAccountFormErrors = createAction<
  {
    prop: string;
    error: string;
  },
  typeof SET_ACCOUNT_FORM_ERRORS
>(SET_ACCOUNT_FORM_ERRORS);

export const clearEliminationFormErrors = createAction<
  void,
  typeof CLEAR_ELIMINATION_FORM_ERRORS
>(CLEAR_ELIMINATION_FORM_ERRORS);
export const setEliminationFormErrors = createAction<
  {
    prop: string;
    error: string;
  },
  typeof SET_ELIMINATION_FORM_ERRORS
>(SET_ELIMINATION_FORM_ERRORS);



export const setAccountEditId = createAction<
  number,
  typeof SET_ACCOUNT_EDIT_ID
>(SET_ACCOUNT_EDIT_ID);
export const unsetAccountEditId = createAction<
  void,
  typeof UNSET_ACCOUNT_EDIT_ID
>(UNSET_ACCOUNT_EDIT_ID);
export const editAccount = createAction<
  {
    accountForm: Account;
    callback: () => void;
  },
  typeof EDIT_ACCOUNT
>(EDIT_ACCOUNT);

export const getAccountSelectOptions = createAction<
  string,
  typeof GET_ACCOUNT_SELECT_OPTIONS
>(GET_ACCOUNT_SELECT_OPTIONS);
export const setAccountSelectOptions = createAction<
  AccountSelectOption[],
  typeof SET_ACCOUNT_SELECT_OPTIONS
>(SET_ACCOUNT_SELECT_OPTIONS);



export const createEliminatingTransaction = createAction<
 
  EliminationForm,

  typeof CREATE_ELIMINATING_TRANSACTION
  >(CREATE_ELIMINATING_TRANSACTION);
  
// Define action types (nest through "|")
export type AccountsActionType =
  | ReturnType<typeof getAccounts>
  | ReturnType<typeof setAccounts>
  | ReturnType<typeof setModalOpen>
  | ReturnType<typeof deleteAccount>
  | ReturnType<typeof storeDeleteAccount>
  | ReturnType<typeof setDeleteId>
  | ReturnType<typeof createAccount>
  | ReturnType<typeof setAccountFormErrors>
  | ReturnType<typeof setAccountEditId>
  | ReturnType<typeof editAccount>
  | ReturnType<typeof storeAddAccount>
  | ReturnType<typeof clearAccountFormErrors>
  | ReturnType<typeof unsetAccountEditId>
  | ReturnType<typeof getAccountSelectOptions>
  | ReturnType<typeof setAccountSelectOptions>
  | ReturnType<typeof setEliminationFormErrors>
  | ReturnType<typeof clearEliminationFormErrors>;
