import React from 'react';
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
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { TransactionCategories } from 'store/modules/transactions/types';
import style from './style.module.scss';
import Routes from '../../../../utils/routes';
import { createTransaction } from 'store/modules/transactions';


interface IState {
  amount?: number;
  date: Date;
  category: TransactionCategories;
  description: string;
  accountId: number;
}

const TransactionCreate: React.FC = () => {
  const [state, setState] = React.useState<IState>({ date: new Date(), description: '', category: 0, accountId: 0 });

  const history = useHistory();
  const changeRoute = (route: string) => {
    history.push(route);
  };

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

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(
      createTransaction({
        transactionForm: {
          amount: state.amount,
          date: state.date,
          category: state.category,
          description: state.description,
          accountId: state.accountId
        },
        callback: () => changeRoute(Routes.Transactions),
      })
    );
  };


  return (
    <Container>
      <div className={style.row}>
        <div className={style.column}>
          <div className={style.title}>
            <h1>Create Transaction</h1>
          </div>
          <div className={style.formArea}>
            <div className={style.formField}>
              <TextField id="amount" label="Amount" onChange={(e) => handleAmountChange(parseFloat(e.target.value))} fullWidth />
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={selectedDate}
                onChange={(date) => { if (date) { handleDateChange(date) } }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth
              />
            </MuiPickersUtilsProvider>
            <FormControl fullWidth>
              <InputLabel id="categoryLabel">Category</InputLabel>

              <Select onChange={(e) => handleCategoryChange(e.target.value as number)} id="category" labelId="categoryLabel" fullWidth>
                {Object.keys(TransactionCategories).map((category) => {
                  if (isNaN(parseFloat(category)))
                    return (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    );
                  return null;
                })}
              </Select>
            </FormControl>

            <TextField multiline label="Description" onChange={(e) => handleDescriptionChange(e.target.value)} fullWidth />
            <FormControl fullWidth>
              <InputLabel id="accountLabel">Account</InputLabel>

              <Select onChange={(e) => handleAccountIdChange(e.target.value as number)} id="account" labelId="accountLabel" fullWidth>
                <MenuItem value={1}>Cash</MenuItem>
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

export default TransactionCreate;
