import { Dictionary } from 'utils/types';

export interface CurrencySubscription {
  id: number;
  currency: CurrencySubscriptionCurrencies;
}

export interface CurrencySubscriptionsState {
  currencySubscriptions: Dictionary<CurrencySubscription>;
  errors: CurrencySubscriptionFormErrors;
}

export interface CurrencySubscriptionFormType {
  currency: CurrencySubscriptionCurrencies;
}

export interface CurrencySubscriptionFormErrors {
  currency: string;
}

export enum CurrencySubscriptionCurrencies {
  'HKD',
  'ISK',
  'PHP',
  'DKK',
  'HUF',
  'CZK',
  'GBP',
  'RON',
  'SEK',
  'IDR',
  'INR',
  'BRL',
  'RUB',
  'HRK',
  'JPY',
  'THB',
  'CHF',
  'MYR',
  'BGN',
  'TRY',
  'CNY',
  'NOK',
  'NZD',
  'ZAR',
  'MXN',
  'SGD',
  'AUD',
  'ILS',
  'KRW',
  'PLN',
}

export const GET_CURRENCY_SUBSCRIPTIONS =
  'currencySubscriptions/GET_CURRENCY_SUBSCRIPTIONS';
export const SET_CURRENCY_SUBSCRIPTIONS =
  'currencySubscriptions/SET_CURRENCY_SUBSCRIPTIONS';
export const CREATE_CURRENCY_SUBSCRIPTION =
  'currencySubscriptions/CREATE_CURRENCY_SUBSCRIPTION';
export const STORE_ADD_CURRENCY_SUBSCRIPTION =
  'currencySubscriptions/STORE_ADD_CURRENCY_SUBSCRIPTION';
export const SET_CURRENCY_SUBSCRIPTION_FORM_ERRORS =
  'currencySubscriptions/SET_CURRENCY_SUBSCRIPTION_FORM_ERRORS';
export const CLEAR_CURRENCY_SUBSCRIPTION_FORM_ERRORS =
  'currencySubscriptions/CLEAR_CURRENCY_SUBSCRIPTION_FORM_ERRORS';
export const GET_CURRENCY_SUBSCRIPTION_SELECT_OPTIONS =
  'currencySubscriptions/GET_CURRENCY_SUBSCRIPTION_SELECT_OPTIONS';
export const SET_CURRENCY_SUBSCRIPTION_SELECT_OPTIONS =
  'currencySubscriptions/SET_CURRENCY_SUBSCRIPTION_SELECT_OPTIONS';
