export const createAction = <T, N>(type: N) => (payload: T) => ({
  type,
  payload,
});
