import axios, { AxiosResponse } from 'axios';
import {Tendency} from './types';

interface GetTendenciesResponse extends AxiosResponse {
  data: Tendency[];
}

export const getTendencies = () =>
  axios
  .get('https://localhost:5001/api/transactions/tendencies', { params: { userId: 1 } })
  .then((res: GetTendenciesResponse) => res.data);


