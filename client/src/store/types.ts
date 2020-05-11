import { ExampleState } from './modules/example/types';
import { AccountsState } from './modules/accounts/types';
import { GlobalState } from './modules/global/types';

export interface State {
  example: ExampleState;
  account: AccountsState;
  globals: GlobalState;
}
