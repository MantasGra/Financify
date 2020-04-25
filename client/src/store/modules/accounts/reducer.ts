import { AccountsState, SET_ACCOUNTS, SET_MODAL } from './types';
import { AccountsActionType } from './actions';

const initialState: AccountsState = {
  accounts: {},
  isModalOpen: false
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
        isModalOpen: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
