import { ActionNameType } from './types';

// eslint-disable-next-line
export const createAction = <T extends any>(type: ActionNameType) => (
  payload?: T
) => ({
  type,
  payload,
});
