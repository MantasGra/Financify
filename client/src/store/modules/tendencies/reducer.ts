import {
  TendenciesState,
  GET_TENDENCIES,
  SET_TENDENCIES,
} from './types';
import { TendenciesAction } from './actions';

const initialState: TendenciesState = {
  tendencies: {},
};

// Reducer should be extended with cases as needed and should always return a state object.
const reducer = (
  state = initialState,
  action: TendenciesAction
): TendenciesState => {
  switch (action.type) {
    case GET_TENDENCIES:
      return {
        ...state,
      };
    case SET_TENDENCIES:
      return {
        ...state,
        tendencies: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
