import React from 'react';
import MUISnackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'store';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { setSnackbar } from 'store/modules/global/actions';
import { SnackbarType } from '../../store/modules/global/types';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Snackbar = () => {
  const classes = useStyles();

  const snackbar = useSelector<State, SnackbarType | undefined>(
    (state) => state.globals.snackbar
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSnackbar());
  };

  return (
    <div className={classes.root}>
      <MUISnackbar
        open={!!snackbar}
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
