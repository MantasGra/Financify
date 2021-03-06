import React from 'react';
import MUISnackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'store';
import { setSnackbar } from 'store/modules/global/actions';
import { SnackbarType } from '../../store/modules/global/types';
import style from './style.module.scss';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Snackbar = () => {
  const snackbar = useSelector<State, SnackbarType>((state) => {
    return state.globals.snackbar;
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSnackbar({ ...snackbar, isOpen: false }));
  };

  return (
    <div className={style.root}>
      <MUISnackbar
        open={snackbar.isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar ? snackbar.severity : undefined}
        >
          {snackbar ? snackbar.text : null}
        </Alert>
      </MUISnackbar>
    </div>
  );
};

export default Snackbar;
