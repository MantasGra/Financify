import { AccountsState } from './modules/accounts/types';
import { GlobalState } from './modules/global/types';
import { TransactionState } from './modules/transactions/types';
import { TendenciesState } from './modules/tendencies/types';
export interface State {
  transactions: TransactionState;
  account: AccountsState;
  tendencies: TendenciesState;
  globals: GlobalState;
}
