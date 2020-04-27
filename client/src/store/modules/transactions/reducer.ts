import { TransactionState, SET_TRANSACTIONS, GET_TRANSACTIONS, SET_MODAL, SET_EDIT_ID } from './types';
import { TransactionAction } from './actions';

const initialState: TransactionState = {
  transactions: [
    {
      id: 1,
      amount: 56.1,
      date: new Date('2019-01-10'),
      category: 3,
      description: 'Example description 1',
      disabled: false,
      account: {id:0, name:'Cash'},
    },
    {
      id: 2,
      amount: 12.54,
      date: new Date('2020-05-21'),
      category: 1,
      description: 'Example description 2',
      disabled: true,
      account: {id:1, name:'Card'},
    },
  ],
  isModalOpen: false,
  editTransactionId: 0,
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
    default:
      return state;
  }
};

export default reducer;
