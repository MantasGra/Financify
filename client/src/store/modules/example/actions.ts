import { createAction } from '../../actions';
import {
  ExampleType,
  SET_TEXT,
  GET_RANDOM_FACT,
  SET_RANDOM_FACT,
} from './types';

// Define action creators
export const setText = createAction<ExampleType>(SET_TEXT);
export const getRandomFact = createAction(GET_RANDOM_FACT);
export const setRandomFact = createAction<string>(SET_RANDOM_FACT);

// Define action types (nest through "|")
export type ExampleActionType =
  | ReturnType<typeof setText>
  | ReturnType<typeof getRandomFact>
  | ReturnType<typeof setRandomFact>;
