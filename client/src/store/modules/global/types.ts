export interface SnackbarType {
  severity: 'success' | 'warning' | 'info' | 'error';
  text: string;
  isOpen: boolean;
}

export interface GlobalState {
  snackbar: SnackbarType;
}
// Define action names
export const SET_SNACKBAR = 'global/SET_SNACKBAR';
