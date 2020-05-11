// Define types for different objects
export interface ExampleType {
  text: string;
}

// Define type for state of a given module
export interface ExampleState {
  textObject: ExampleType;
  randomFact: string;
  number?: number;
}

// Define action names
export const SET_TEXT = 'example/SET_TEXT';
export const GET_RANDOM_FACT = 'example/GET_RANDOM_FACT';
export const SET_RANDOM_FACT = 'example/SET_RANDOM_FACT';
