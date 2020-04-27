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
import { setModalOpen, deleteTransaction } from 'store/modules/transactions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransactionDeleteModal: React.FC = () => {
  const isOpen = useSelector<State, boolean>(
    (state) => state.transactions.isModalOpen
  );

  const dispatch = useDispatch();

  const deleteId = useSelector<State, number | undefined>(
    (state) => state.transactions.deleteId
  );
  
  const handleClose = () => {
    dispatch(setModalOpen(false));
  };

  const handleDelete = (id?: number) => {
    console.log('id ',id)
    if (id) {
      dispatch(deleteTransaction(id));
    }
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
        Are you sure you want to delete this transaction?
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Disagree
        </Button>
        <Button onClick={() => handleDelete(deleteId)} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDeleteModal;