import { ExampleActionNameType, ExampleState } from './modules/example/types';
import {
  TransactionActionType,
  TransactionState,
} from './modules/transactions/types';

// Nest types from multiple modules using "|"
export type ActionNameType = ExampleActionNameType | TransactionActionType;

export interface State {
  example: ExampleState;
  transactions: TransactionState;
}
