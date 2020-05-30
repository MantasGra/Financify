import { Dictionary } from 'utils/types';

// Define types for different objects
export interface Tendency {
  date: String;
  amount: number;
  coeficient: number;
}

// Define type for state of a given module
export interface TendenciesState {
  tendencies: Dictionary<Tendency>;
}

// Define action names
export const GET_TENDENCIES = 'tendencies/GET_TENDENCIES';
export const SET_TENDENCIES = 'tendencies/SET_TENDENCIES';

