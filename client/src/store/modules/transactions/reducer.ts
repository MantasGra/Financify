import { toDictionary } from 'utils/parsers';
import {
  Transaction,
  TransactionState,
  STORE_ADD_TRANSACTION,
  SET_DELETE_ID,
  STORE_DELETE_TRANSACTION,
  SET_TRANSACTIONS,
  GET_TRANSACTIONS,
  SET_MODAL,
  SET_EDIT_ID,
  SET_TRANSACTION_FORM_ERRORS,
  CLEAR_TRANSACTION_FORM_ERRORS,
} from './types';
import { TransactionAction } from './actions';

const initialState: TransactionState = {
  transactions: {},
  isModalOpen: false,
  editTransactionId: 0,
  errors: {},
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
        isModalOpen: action.payload,
      };
    case SET_EDIT_ID:
      return {
        ...state,
        editTransactionId: action.payload,
      };
    case SET_DELETE_ID:
      return {
        ...state,
        deleteId: action.payload,
      };
    case STORE_DELETE_TRANSACTION:
      return {
        ...state,
        transactions: toDictionary<Transaction>(
          Object.keys(state.transactions)
            .filter((val) => parseFloat(val) !== action.payload)
            .map((val) => state.transactions[val]),
          'id'
        ),
      };
    case STORE_ADD_TRANSACTION:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.id]: action.payload,
        },
      };
    case SET_TRANSACTION_FORM_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.prop]: action.payload.error,
        },
      };
    case CLEAR_TRANSACTION_FORM_ERRORS:
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
};

export default reducer;
