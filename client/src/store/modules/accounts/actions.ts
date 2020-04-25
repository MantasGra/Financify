import { Dictionary } from 'utils/types';
import { createAction } from '../../actions';
import { AccountType, GET_ACCOUNTS, SET_ACCOUNTS, SET_MODAL } from './types';

// Define action creators
export const setModalOpen = createAction<boolean>(SET_MODAL);
export const getAccounts = createAction(GET_ACCOUNTS);
export const setAccounts = createAction<Dictionary<AccountType>>(SET_ACCOUNTS);

// Define action types (nest through "|")
export type AccountsActionType =
  | ReturnType<typeof getAccounts>
  | ReturnType<typeof setAccounts>;
