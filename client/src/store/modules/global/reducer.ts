import { GlobalState, SET_SNACKBAR } from './types';
import { GlobalActionType } from './actions';

const initialState: GlobalState = {};

// Reducer should be extended with cases as needed and should always return a state object.
const reducer = (
  state = initialState,
  action: GlobalActionType
): GlobalState => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
