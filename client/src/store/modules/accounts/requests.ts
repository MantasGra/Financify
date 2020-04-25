import { AxiosResponse } from 'axios';

interface GetAccountsResponse extends AxiosResponse {
  data: [
    {
      title: string;
      type: string;
    }
  ];
}

export const getAccounts = () => [
  {
    id: 1,
    title: 'Personal Savings',
    type: 'Cash',
  },
  {
    id: 2,
    title: 'Salary',
    type: 'Debit Card',
  },
];
