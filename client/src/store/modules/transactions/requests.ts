import axios, { AxiosResponse } from 'axios';

export const getTransactions = () => [
  {
    id: '1',
    amount: '56.10',
    date: '2020-04-26',
    category: 3,
    description: 'Example description 1',
    disabled: false,
    account: 'Swedbank',
  },
  {
    id: '2',
    amount: '12.54',
    date: '2020-03-10',
    category: 1,
    description: 'Example description 2',
    disabled: true,
    account: 'Paypal',
  },
];
