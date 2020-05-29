import { AccountsState } from './modules/accounts/types';
import { GlobalState } from './modules/global/types';
import { TransactionState } from './modules/transactions/types';
import { CurrencySubscriptionsState } from './modules/currencySubscriptions';

export interface State {
  transactions: TransactionState;
  account: AccountsState;
  globals: GlobalState;
  currencySubscription: CurrencySubscriptionsState;
}
