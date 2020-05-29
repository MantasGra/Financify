/* eslint-disable @typescript-eslint/indent */
import { createAction } from 'store/actions';
import { Dictionary } from 'utils/types';
import {
  GET_CURRENCY_SUBSCRIPTIONS,
  CurrencySubscription,
  SET_CURRENCY_SUBSCRIPTIONS,
} from './types';

export const getCurrencySubscriptions = createAction<
  void,
  typeof GET_CURRENCY_SUBSCRIPTIONS
>(GET_CURRENCY_SUBSCRIPTIONS);
export const setCurrencySubscriptions = createAction<
  Dictionary<CurrencySubscription>,
  typeof SET_CURRENCY_SUBSCRIPTIONS
>(SET_CURRENCY_SUBSCRIPTIONS);

export type CurrencySubscriptionsActionType =
  | ReturnType<typeof getCurrencySubscriptions>
  | ReturnType<typeof setCurrencySubscriptions>;
