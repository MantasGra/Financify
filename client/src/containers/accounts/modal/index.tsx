import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'store';
import { setModalOpen } from 'store/modules/accounts';
import { setSnackbar } from 'store/modules/global/actions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AccountDeleteModal: React.FC = () => {
  const isOpen = useSelector<State, boolean>(
    (state) => state.account.isModalOpen
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setModalOpen(false));
  };

  const handleDelete = () => {
    handleClose();
    dispatch(
      setSnackbar({ severity: 'success', text: 'Account deleted successfully' })
    );
  };

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Are you sure you want to delete this account?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          This means that you will also delete all your transactions that are
          connected to this account. This action can't be reverted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Disagree
        </Button>
        <Button onClick={handleDelete} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountDeleteModal;
