// Define types for different objects
export interface Tendency {
  date: Date;
  amount: number;
  coeficient: number;
}

export interface ExpensesReport {
  month: string;
  expenses: number;
}

// Define type for state of a given module
export interface ReportsState {
  expensesReport: ExpensesReport[];
  tendencies: Tendency[];
}

// Define action names
export const GET_TENDENCIES = 'tendencies/GET_TENDENCIES';
export const SET_TENDENCIES = 'tendencies/SET_TENDENCIES';
export const GET_EXPENSES_REPORT = 'tendencies/GET_EXPENSES_REPORT';
export const SET_EXPENSES_REPORT = 'tendencies/SET_EXPENSES_REPORT';
