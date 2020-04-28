import { Dictionary } from 'utils/types';
import { createAction } from '../../actions';
import {
  AccountType,
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
} from './types';

// Define action creators
export const setModalOpen = createAction<boolean>(SET_MODAL);
export const getAccounts = createAction(GET_ACCOUNTS);
export const setAccounts = createAction<Dictionary<AccountType>>(SET_ACCOUNTS);
export const deleteAccount = createAction<number>(DELETE_ACCOUNT);
export const storeDeleteAccount = createAction<number>(STORE_DELETE_ACCOUNT);
export const setDeleteId = createAction(SET_DELETE_ID);
export const createAccount = createAction<{
  accountForm: AccountFormType;
  callback: () => void;
}>(CREATE_ACCOUNT);
export const storeAddAccount = createAction<AccountType>(STORE_ADD_ACCOUNT);
export const clearAccountFormErrors = createAction(CLEAR_ACCOUNT_FORM_ERRORS);
export const setAccountFormErrors = createAction<{
  prop: string;
  error: string;
}>(SET_ACCOUNT_FORM_ERRORS);
export const setAccountEditId = createAction<number>(SET_ACCOUNT_EDIT_ID);
export const unsetAccountEditId = createAction(UNSET_ACCOUNT_EDIT_ID);
export const editAccount = createAction<{
  accountForm: AccountType;
  callback: () => void;
}>(EDIT_ACCOUNT);

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
  | ReturnType<typeof storeAddAccount>;
