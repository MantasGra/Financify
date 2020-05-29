import axios, { AxiosResponse } from 'axios';
import { CurrencySubscription } from './types';

interface GetCurrencySubscriptionsResponse extends AxiosResponse {
  data: CurrencySubscription[];
}

export const getCurrencySubscriptions = () => {
  return axios.get('https://localhost:5001/api/currency-subscriptions', { params: { userId: 1 } })
    .then((res: GetCurrencySubscriptionsResponse) => res.data);
};

export const createCurrencySubscription = (data: CurrencySubscription) => {
  return axios.post('https://localhost:5001/api/currency-subscriptions', { ...data, userId: 1 })
    .then((res: AxiosResponse) => res.data);
};