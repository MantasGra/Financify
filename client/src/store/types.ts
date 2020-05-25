import { AccountsState } from './modules/accounts/types';
import { GlobalState } from './modules/global/types';
import { TransactionState } from './modules/transactions/types';
import { BudgetsState } from './modules/budgets';

export interface State {
  transactions: TransactionState;
  account: AccountsState;
  globals: GlobalState;
  budget: BudgetsState;
}
