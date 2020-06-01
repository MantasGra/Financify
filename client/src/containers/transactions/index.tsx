import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
import {
  Transaction,
  setDeleteId,
  TransactionCategoryIcons,
} from 'store/modules/transactions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { IconButton, Divider, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { State } from 'store';
import Routes from 'utils/routes';
import {
  getTransactions,
  setModalOpen,
  setEditTransactionId,
  clearTransactionFormErrors,
} from 'store/modules/transactions/actions';
import style from './style.module.scss';
import Modal from './components/modal';

const Trans: React.FC = () => {
  const transactions = useSelector<State, Transaction[]>((state) =>
    Object.keys(state.transactions.transactions).map(
      (key) => state.transactions.transactions[key]
    )
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const openEdit = (id: number) => {
    dispatch(clearTransactionFormErrors());
    dispatch(setEditTransactionId(id));
    changeRoute(Routes.TransactionsEdit);
  };

  React.useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const openCreate = () => {
    dispatch(clearTransactionFormErrors());
    dispatch(setEditTransactionId(0));
    changeRoute(Routes.TransactionsCreate);
  };

  const openModal = (id: number) => {
    dispatch(setModalOpen(true));
    dispatch(setDeleteId(id));
  };
  const changeRoute = (route: string) => {
    history.push(route);
  };
  return (
    <>
      <div className={style.title}>
        <h1>Your Transactions</h1>
      </div>
      <Paper className={style.paperContainer} elevation={5}>
        <div className={style.listStyle}>
          <List>
            {transactions.map((row: Transaction, index) => (
              <React.Fragment key={row.id}>
                <ListItem>
                  <ListItemIcon>
                    {TransactionCategoryIcons[row.category]}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <span className={style.listItemPrimary}>
                        € {row.amount.toFixed(2)}{' '}
                        <span>
                          //
                          <span> {row.account.name}</span>
                        </span>
                      </span>
                    }
                    secondary={
                      <span className={style.listItemSecondary}>
                        {row.description}
                      </span>
                    }
                  />
                  <IconButton onClick={() => openEdit(row.id)}>
                    <EditIcon color="action" />
                  </IconButton>
                  <IconButton onClick={() => openModal(row.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </ListItem>
                {index === transactions.length - 1 ? null : <Divider />}
              </React.Fragment>
            ))}
          </List>
        </div>
      </Paper>
      <Fab
        size="medium"
        color="secondary"
        aria-label="add"
        className={style.fab}
        onClick={openCreate}
      >
        <AddIcon />
      </Fab>
      <Modal />
    </>
  );
};

export default Trans;
