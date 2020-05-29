/* eslint-disable @typescript-eslint/indent */
import { createAction } from 'store/actions';
import { Dictionary } from 'utils/types';
import {
  GET_CURRENCY_SUBSCRIPTIONS,
  CurrencySubscription,
  SET_CURRENCY_SUBSCRIPTIONS,
  SET_CURRENCY_SUBSCRIPTION_FORM_ERRORS,
  CREATE_CURRENCY_SUBSCRIPTION,
  CLEAR_CURRENCY_SUBSCRIPTION_FORM_ERRORS,
  STORE_ADD_CURRENCY_SUBSCRIPTION,
  CurrencySubscriptionFormType
} from './types';

export const getCurrencySubscriptions = createAction<
  void,
  typeof GET_CURRENCY_SUBSCRIPTIONS
>(GET_CURRENCY_SUBSCRIPTIONS);

export const setCurrencySubscriptions = createAction<
  Dictionary<CurrencySubscription>,
  typeof SET_CURRENCY_SUBSCRIPTIONS
>(SET_CURRENCY_SUBSCRIPTIONS);

export const setCurrencySubscriptionFormErrors = createAction<
  {
    prop: string;
    error: string;
  },
  typeof SET_CURRENCY_SUBSCRIPTION_FORM_ERRORS
>(SET_CURRENCY_SUBSCRIPTION_FORM_ERRORS);

export const clearCurrencySubscriptionFormErrors = createAction<
  void,
  typeof CLEAR_CURRENCY_SUBSCRIPTION_FORM_ERRORS
>(CLEAR_CURRENCY_SUBSCRIPTION_FORM_ERRORS);

export const createCurrencySubscription = createAction<
  {
    currencySubscriptionForm: CurrencySubscriptionFormType;
    callback: () => void;
  },
  typeof CREATE_CURRENCY_SUBSCRIPTION
>(CREATE_CURRENCY_SUBSCRIPTION);

export const storeAddCurrencySubscription = createAction<
  CurrencySubscription,
  typeof STORE_ADD_CURRENCY_SUBSCRIPTION
>(STORE_ADD_CURRENCY_SUBSCRIPTION);

export type CurrencySubscriptionsActionType =
  | ReturnType<typeof getCurrencySubscriptions>
  | ReturnType<typeof setCurrencySubscriptions>
  | ReturnType<typeof setCurrencySubscriptionFormErrors>
  | ReturnType<typeof clearCurrencySubscriptionFormErrors>
  | ReturnType<typeof createCurrencySubscription>
  | ReturnType<typeof storeAddCurrencySubscription>;
