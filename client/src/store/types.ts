import { ExampleActionNameType, ExampleState } from './modules/example/types';
import {
  TransactionActionType,
  TransactionState,
} from './modules/transactions/types';
import { AccountActionNameType, AccountsState } from './modules/accounts/types';
import { GlobalState } from './modules/global/types';

// Nest types from multiple modules using "|"
export type ActionNameType = ExampleActionNameType | TransactionActionType;

export type AccountNameType = AccountActionNameType;

export interface State {
  example: ExampleState;
  transactions: TransactionState;
  account: AccountsState;
  globals: GlobalState;
}
