import { TransactionState, SET_TRANSACTIONS, GET_TRANSACTIONS } from './types';
import { TransactionAction } from './actions';

const initialState: TransactionState = {
  transactions: [
    {
      id: 1,
      amount: 56.1,
      date: new Date(),
      category: 3,
      description: 'Example description 1',
      disabled: false,
      account: 'Swedbank',
    },
    {
      id: 2,
      amount: 12.54,
      date: new Date(),
      category: 1,
      description: 'Example description 2',
      disabled: true,
      account: 'Paypal',
    },
  ],
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
    default:
      return state;
  }
};

export default reducer;
