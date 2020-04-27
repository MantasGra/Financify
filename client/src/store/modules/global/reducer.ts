import { GlobalState, SET_SNACKBAR, SnackbarType } from './types';
import { GlobalActionType } from './actions';

const initialState: GlobalState = {
  snackbar: {
    severity: 'info',
    text: 'empty message',
    isOpen: false,
  },
};

// Reducer should be extended with cases as needed and should always return a state object.
const reducer = (
  state = initialState,
  action: GlobalActionType
): GlobalState => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload as SnackbarType,
      };
    default:
      return state;
  }
};

export default reducer;
