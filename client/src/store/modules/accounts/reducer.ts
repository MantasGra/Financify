import { toDictionary } from 'utils/parsers';
import {
  AccountsState,
  SET_ACCOUNTS,
  SET_MODAL,
  SET_DELETE_ID,
  STORE_DELETE_ACCOUNT,
  AccountType,
  STORE_ADD_ACCOUNT,
  SET_ACCOUNT_FORM_ERRORS,
  CLEAR_ACCOUNT_FORM_ERRORS,
  SET_ACCOUNT_EDIT_ID,
} from './types';
import { AccountsActionType } from './actions';

const initialState: AccountsState = {
  accounts: {},
  isModalOpen: false,
  errors: { name: '', type: '' },
};

// Reducer should be extended with cases as needed and should always return a state object.
const reducer = (
  state = initialState,
  action: AccountsActionType
): AccountsState => {
  switch (action.type) {
    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case SET_MODAL:
      return {
        ...state,
        isModalOpen: action.payload,
      };
    case SET_DELETE_ID:
      return {
        ...state,
        deleteId: action.payload,
      };
    case STORE_DELETE_ACCOUNT:
      return {
        ...state,
        accounts: toDictionary<AccountType>(
          Object.keys(state.accounts)
            .filter((val) => parseFloat(val) !== action.payload)
            .map((val) => state.accounts[val]),
          'id'
        ),
      };
    case STORE_ADD_ACCOUNT:
      return {
        ...state,
        accounts: { ...state.accounts, [action.payload.id]: action.payload },
      };
    case SET_ACCOUNT_FORM_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.prop]: action.payload.error,
        },
      };
    case CLEAR_ACCOUNT_FORM_ERRORS:
      return {
        ...state,
        errors: { name: '', type: '' },
      };
    case SET_ACCOUNT_EDIT_ID:
      return {
        ...state,
        editId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
