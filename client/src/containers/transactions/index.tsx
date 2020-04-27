import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/More';
import { useSelector, useDispatch } from 'react-redux';
import { Transaction, setDeleteId } from 'store/modules/transactions';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, Button, Paper, Divider,Snackbar } from '@material-ui/core';
import { useHistory, Route } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { TransactionCategories } from 'store/modules/transactions/types';
import Routes from '../../utils/routes';
import {
  getTransactions,
  setModalOpen,
  setEditTransactionsId,
  setMoreTransactionsId
} from '../../store/modules/transactions/actions';
import { State } from '../../store';
import style from './style.module.scss';
import Modal from '../transactions/components/modal'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      margin: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Trans: React.FC = () => {
  const transactions = useSelector<State, Transaction[]>(
    (state) => state.transactions.transactions
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const openEdit = (id: number) => {
    dispatch(setEditTransactionsId(id));
    changeRoute(Routes.TransactionsEdit);
  }

  const openMore = (id: number) => {
    dispatch(setMoreTransactionsId(id));
    changeRoute(Routes.TransactionsMore);
  }

  React.useEffect(() => {
    dispatch(getTransactions());
  }, []);
  const openModal = (id: number) => {
    dispatch(setModalOpen(true));
    dispatch(setDeleteId(id));
  };
  const changeRoute = (route: string) => {
    history.push(route);
  };
  const classes = useStyles();
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Your transactions</h1>
      </div>
      <div>
        <Paper
          style={{
            margin: 'auto',
            width: 500,
          }}
          elevation={5}
        >
          <List className={classes.root}>
            {transactions.map((row) => (
              <>
                <ListItem key={row.id}>
                  <ListItemText
                    primary={TransactionCategories[row.category]}
                    secondary={row.amount}
                  />

                  <IconButton onClick={() => openMore(row.id)}>
                    <MoreIcon />
                  </IconButton>
                  <IconButton onClick={() => openEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openModal(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Paper>
      </div>
      <Fab
        size="medium"
        color="secondary"
        aria-label="add"
        className={style.fab}
        onClick={() => changeRoute(Routes.TransactionsCreate)}
      >
        <AddIcon />
      </Fab>
      <Modal />
      <Snackbar />
    </div>
  );
};

export default Trans;
