import { createAction } from '../../actions';
import { SET_SNACKBAR, SnackbarType } from './types';

// Define action creators
export const setSnackbar = createAction<SnackbarType, typeof SET_SNACKBAR>(
  SET_SNACKBAR
);

// Define action types (nest through "|")
export type GlobalActionType = ReturnType<typeof setSnackbar>;
