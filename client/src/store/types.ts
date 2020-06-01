import { AccountsState } from './modules/accounts/types';
import { GlobalState } from './modules/global/types';
import { TransactionState } from './modules/transactions/types';
import { BudgetsState } from './modules/budgets';
import { CurrencySubscriptionsState } from './modules/currencySubscriptions';

export interface State {
  transactions: TransactionState;
  account: AccountsState;
  globals: GlobalState;
  budget: BudgetsState;
  currencySubscription: CurrencySubscriptionsState;
}
