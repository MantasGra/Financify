// Disabling because of conflict with prettier, formatting code takes care of indenting
/* eslint @typescript-eslint/indent: 0 */
import { createAction } from '../../actions';
import { Tendency, GET_TENDENCIES, SET_TENDENCIES } from './types';

// Define action creators
export const getTendencies = createAction<void, typeof GET_TENDENCIES>(
  GET_TENDENCIES
);

export const setTendencies = createAction<Tendency[], typeof SET_TENDENCIES>(
  SET_TENDENCIES
);

// Define action types (nest through "|")
export type TendenciesAction =
  | ReturnType<typeof getTendencies>
  | ReturnType<typeof setTendencies>;
