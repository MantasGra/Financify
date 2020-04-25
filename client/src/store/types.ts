import { ExampleActionNameType, ExampleState } from './modules/example/types';
import { AccountActionNameType, AccountsState } from './modules/accounts/types';
import { GlobalState } from './modules/global/types';

// Nest types from multiple modules using "|"
export type ActionNameType = ExampleActionNameType;

export type AccountNameType = AccountActionNameType;

export interface State {
  example: ExampleState;
  account: AccountsState;
  globals: GlobalState;
}
