import axios, { AxiosResponse } from 'axios';
import { Account, AccountFormType, AccountSelectOption } from './types';

interface GetAccountsResponse extends AxiosResponse {
  data: Account[];
}

interface GetSelectOptionsResponse extends AxiosResponse {
  data: AccountSelectOption[];
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

export const editAccount = (account: Account) =>
  axios
    .put(`https://localhost:5001/api/accounts/${account.id}`, {
      ...account,
      userId: 1,
    })
    .then((res: AxiosResponse) => res.data);

export const getSelectOptions = (input: string) =>
  axios
    .get('https://localhost:5001/api/select-options/accounts', {
      params: {
        name: input,
        userId: 1,
      },
    })
    .then((res: GetSelectOptionsResponse) => res.data);
