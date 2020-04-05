import { ExampleActionNameType, ExampleState } from './modules/example/types';

// Nest types from multiple modules using "|"
export type ActionNameType = ExampleActionNameType;

export interface State {
  example: ExampleState;
}
