// Define types for different objects
export interface Tendency {
  date: Date;
  amount: number;
  coeficient: number;
}

// Define type for state of a given module
export interface ReportsState {
  tendencies: Tendency[];
}

// Define action names
export const GET_TENDENCIES = 'tendencies/GET_TENDENCIES';
export const SET_TENDENCIES = 'tendencies/SET_TENDENCIES';
