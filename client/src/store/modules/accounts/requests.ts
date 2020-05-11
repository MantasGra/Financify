import axios, { AxiosResponse } from 'axios';
import { AccountType, AccountFormType } from './types';

interface GetAccountsResponse extends AxiosResponse {
  data: AccountType[];
}

export const getAccounts = () =>
  axios
    .get('https://localhost:5001/api/accounts', { params: { userId: 1 } })
    .then((res: GetAccountsResponse) => res.data);

export const deleteAccount = (id: number) =>
  axios
    .delete(`https://localhost:5001/api/accounts/${id}`)
    .then((res: AxiosResponse) => res.status);

export const createAccount = (account: AccountFormType) =>
  axios
    .post('https://localhost:5001/api/accounts', { ...account, userId: 1 })
    .then((res: AxiosResponse) => res.data);

export const editAccount = (account: AccountType) =>
  axios
    .put(`https://localhost:5001/api/accounts/${account.id}`, {
      ...account,
      userId: 1,
    })
    .then((res: AxiosResponse) => res.data);
