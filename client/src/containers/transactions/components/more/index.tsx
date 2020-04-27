import React from 'react';
import { useSelector } from 'react-redux';
import { Transaction } from 'store/modules/transactions';
import { State } from 'store';
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
interface IState {
  amount?: number;
  date: Date;
  category: TransactionCategories;
  description: string;
  account: {id: number, name: string};
}
const TransactionMore: React.FC = () => {

  const [state, setState] = React.useState<IState>({ date: new Date(), description: '',category: 0, account: {id: 0, name: ''}});
  
  const transaction = useSelector<State, Transaction | undefined>(
    (state) => state.transactions.transactions.find(transaction => transaction.id === state.transactions.moreTransactionId)
  );
  const classes = useStyles();
  
  React.useEffect(() => {
    if (transaction) {
      setState({ amount: transaction.amount, date: transaction.date, category: transaction.category, description: transaction.description, account: transaction.account })
    }
  }, [transaction])

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
                  <ListItemText primary="Amount" secondary={state.amount} />        
                </ListItem>
                <ListItem>
                  <ListItemText primary="Date" secondary={state.date.toDateString()} />            
                </ListItem>
                <ListItem>
                  <ListItemText primary="Category" secondary={TransactionCategories[state.category]} />            
                </ListItem>
                <ListItem>
                  <ListItemText primary="Description" secondary={state.description} />            
                </ListItem>
                <ListItem>
                  <ListItemText primary="Account" secondary={state.account.name} />            
                </ListItem>
              </List>
            </Paper>
          </div>
        </div>

      );

};

export default TransactionMore;
