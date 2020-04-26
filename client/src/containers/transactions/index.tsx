import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/More';
import { useSelector, useDispatch } from 'react-redux';
import style from './style.module.scss';
import { State } from '../../store';
import { getTransactions } from '../../store/modules/transactions/actions';
import { Transaction } from 'store/modules/transactions';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, Button } from '@material-ui/core';
import Routes from '../../utils/routes';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Trans: React.FC = () => {
  const transactions = useSelector<State, Transaction[]>(
    (state) => state.transactions.transactions
  );
  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };
  const classes = useStyles();
  return (
    <div>
      <div className={style.buttonContainer}>
        <Button
          variant="contained"
          className={style.buttonContainer}
          color="primary"
          onClick={() => changeRoute(Routes.TransactionsCreate)}
        >
          Create new transaction
        </Button>
      </div>
      <List className={classes.root}>
        {transactions.map((row) => (
          <ListItem>
            <ListItemText primary={row.category} secondary={row.amount} />
            {row.account}
            <IconButton>
              <MoreIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Trans;
