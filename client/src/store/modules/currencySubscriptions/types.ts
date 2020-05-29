import { Dictionary } from 'utils/types';

export interface CurrencySubscription {
  id: number;
  currency: string;
}

export interface CurrencySubscriptionsState {
  currencySubscriptions: Dictionary<CurrencySubscription>;
}

export const GET_CURRENCY_SUBSCRIPTIONS =
  'currencySubscriptions/GET_CURRENCY_SUBSCRIPTIONS';
export const SET_CURRENCY_SUBSCRIPTIONS =
  'currencySubscriptions/SET_CURRENCY_SUBSCRIPTIONS';
