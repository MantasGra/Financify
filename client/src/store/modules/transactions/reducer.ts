import { Transaction, TransactionState,STORE_ADD_TRANSACTION, SET_DELETE_ID, STORE_DELETE_TRANSACTION, SET_TRANSACTIONS, GET_TRANSACTIONS, SET_MODAL, SET_EDIT_ID, SET_MORE_ID } from './types';
import { TransactionAction } from './actions';
import { toDictionary } from 'utils/parsers';

const initialState: TransactionState = {
  transactions: [],
  isModalOpen: false,
  editTransactionId: 0,
  moreTransactionId: 0,
  errors: { name: '', type: '' },
};

// Reducer should be extended with cases as needed and should always return a state object.
const reducer = (
  state = initialState,
  action: TransactionAction
): TransactionState => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case SET_MODAL:
      return {
        ...state,
        isModalOpen: action.payload
      };
    case SET_EDIT_ID:
      return {
        ...state,
        editTransactionId: action.payload
      };
    case SET_MORE_ID:
      return {
        ...state,
        moreTransactionId: action.payload
      };
    case SET_DELETE_ID:
      return {
        ...state,
        deleteId: action.payload,
      };
    case STORE_DELETE_TRANSACTION:
      return {
        ...state,
       
      };
    case STORE_ADD_TRANSACTION:
      return {
        ...state,
        transactions: [ ...state.transactions,action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
