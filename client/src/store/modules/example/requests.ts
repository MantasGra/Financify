import axios, { AxiosResponse } from 'axios';

interface RandomFactResponse extends AxiosResponse {
  data: {
    text: string;
  };
}

export const getRandomFact = () =>
  axios
    .get('https://uselessfacts.jsph.pl/random.json?language=en')
    .then((res: RandomFactResponse) => res.data.text);