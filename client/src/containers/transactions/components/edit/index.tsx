import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Transaction, editTransaction } from 'store/modules/transactions';
import { State } from 'store';
import Alert from '@material-ui/lab/Alert';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Menu,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { AccountTypes } from 'store/modules/accounts/types';
import { TransactionCategories } from 'store/modules/transactions/types';
import { useHistory } from 'react-router-dom';
import style from './style.module.scss';

import Routes from '../../../../utils/routes';

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
  accountId: number;
}

const TransactionEdit: React.FC = () => {

  const [state, setState] = React.useState<IState>({ date: new Date(), description: '', category: 0, accountId: 0 });


  const transaction = useSelector<State, Transaction | undefined>(
    (states) => states.transactions.transactions.find(transactio => transactio.id === states.transactions.editTransactionId)
  );
  const classes = useStyles();


  const handleDateChange = (date: Date) => {
    setState(prevState => ({
      ...prevState, date
    }));
  };

  const handleAmountChange = (amount: number) => {
    setState(prevState => ({
      ...prevState, amount
    }));
  };

  const handleCategoryChange = (category: TransactionCategories) => {
    setState(prevState => ({
      ...prevState, category
    }));
  };

  const handleDescriptionChange = (description: string) => {
    setState(prevState => ({
      ...prevState, description
    }));
  };

  const handleAccountIdChange = (accountId: number) => {
    setState(prevState => ({
      ...prevState, accountId
    }));
  };

  React.useEffect(() => {
    if (transaction) {
      setState({ amount: transaction.amount, date: transaction.date, category: transaction.category, description: transaction.description, accountId: transaction.account.id });
    }
  }, [transaction]);

  const dispatch = useDispatch();

  
  const history = useHistory();
  const changeRoute = (route: string) => {
    history.push(route);
  };

  const handleSave = () => {
    /*  dispatch(
      editTransaction({
        transactionForm: {
          amount: state.amount,
          date: state.date,
          category: state.category,
          description: state.description,
          accountId: state.accountId
        },
        callback: () => changeRoute(Routes.Transactions),
      })
    ); */
  };


  return (
    <Container>
      <div className={style.row}>
  
        <div className={style.column}>
          <div className={style.title}>
            <h1>Edit Transaction</h1>
          </div>
          <div className={style.formArea}>
            <div className={style.formField}>
              <TextField id="amount" label="Amount" value={state.amount} onChange={(e) => handleAmountChange(parseFloat(e.target.value))} fullWidth />
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={state.date}
                onChange={(date) => { if (date) { handleDateChange(date); } }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth
              />
            </MuiPickersUtilsProvider>
            <FormControl fullWidth>
              <InputLabel id="categoryLabel">Category</InputLabel>
        
              <Select id="category" labelId="categoryLabel" value={state.category} onChange={(e) => handleCategoryChange(e.target.value as TransactionCategories)} fullWidth>
                {Object.keys(TransactionCategories).map((category) => {
                  if (!isNaN(parseFloat(category))){
                    return (
                      <MenuItem key={category} value={parseFloat(category)}>
                        {TransactionCategories[parseFloat(category)]}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </Select>
            </FormControl>

            <TextField multiline label="Description" value={state.description} onChange={(e) => handleDescriptionChange(e.target.value)} fullWidth />
            <FormControl fullWidth>
              <InputLabel id="categoryLabel">Account</InputLabel>

              <Select id="category" labelId="categoryLabel" value={state.accountId} onChange={(e) => handleAccountIdChange(e.target.value as number)} fullWidth>
                {Object.keys(AccountTypes).map((account, index) => {
                  if (isNaN(parseFloat(account)))
                    return (
                      <MenuItem key={index-3} value={index-3}>
                        {account}
                      </MenuItem>
                    );
                  return null;
                })}
              </Select>
            </FormControl>

            <div style={{ margin: 10 }}>
              <Button
                variant="contained"
                color="primary"
                className={style.button}
                onClick={handleSave}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};




export default TransactionEdit;
