export interface SnackbarType {
  severity: 'success' | 'warning' | 'info' | 'error';
  text: string;
}

export interface GlobalState {
  snackbar?: SnackbarType;
}
// Define action names
export const SET_SNACKBAR = 'global/SET_SNACKBAR';
// Define action name types (multiple types should be nested through "|")
export type GlobalActionNameType = typeof SET_SNACKBAR;
