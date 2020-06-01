import { AccountsState } from './modules/accounts/types';
import { GlobalState } from './modules/global/types';
import { TransactionState } from './modules/transactions/types';
import { BudgetsState } from './modules/budgets';
import { ReportsState } from './modules/reports/types';
import { CurrencySubscriptionsState } from './modules/currencySubscriptions';

export interface State {
  transactions: TransactionState;
  account: AccountsState;
  reports: ReportsState;
  globals: GlobalState;
  budget: BudgetsState;
  currencySubscription: CurrencySubscriptionsState;
}
