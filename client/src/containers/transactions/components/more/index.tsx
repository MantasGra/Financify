import React from 'react';
import { useSelector } from 'react-redux';
import { Transaction } from 'store/modules/transactions';
import { State } from 'store';
import Alert from '@material-ui/lab/Alert';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TransactionCategories } from 'store/modules/transactions/types';

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

const TransactionMore: React.FC = () => {

  const transactions = useSelector<State, Transaction[]>(
    (state) => state.transactions.transactions
  );
  const classes = useStyles();
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].id === Number(new URL(window.location.href).searchParams.get("id"))) {

      return (
        <div>
          <div style={{ textAlign: 'center' }}>
            <h1>More about transaction</h1>
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
                <ListItem>
                  <ListItemText primary="Amount" secondary={transactions[i].amount} />        
                </ListItem>
                <ListItem>
                  <ListItemText primary="Date" secondary={transactions[i].date.toDateString()} />            
                </ListItem>
                <ListItem>
                  <ListItemText primary="Category" secondary={TransactionCategories[transactions[i].category]} />            
                </ListItem>
                <ListItem>
                  <ListItemText primary="Description" secondary={transactions[i].description} />            
                </ListItem>
                <ListItem>
                  <ListItemText primary="Account" secondary={transactions[i].account} />            
                </ListItem>
              </List>
            </Paper>
          </div>
        </div>

      );
    }
  }
  return (
    <div>
      <Alert severity="error">Transaction doesn't exist!</Alert>
    </div>
  );
};

export default TransactionMore;
