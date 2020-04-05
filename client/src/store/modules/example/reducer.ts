import { ExampleState, SET_TEXT, SET_RANDOM_FACT } from './types';
import { ExampleActionType } from './actions';

const initialState: ExampleState = {
  textObject: { text: '' },
  randomFact: 'No fact yet!',
};

// Reducer should be extended with cases as needed and should always return a state object.
const reducer = (
  state = initialState,
  action: ExampleActionType
): ExampleState => {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        textObject: action.payload,
      };
    case SET_RANDOM_FACT: {
      return {
        ...state,
        randomFact: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
