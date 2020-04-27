import React from 'react';
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { State } from 'store';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { TransactionCategories } from 'store/modules/transactions/types';
import style from './style.module.scss';
import Routes from '../../../../utils/routes';
import {
  createTransaction,
  TransactionFormErrors,
  setTransactionFormErrors,
  clearTransactionFormErrors,
} from 'store/modules/transactions';


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
    dispatch(clearTransactionFormErrors());
    const failedValidation = validate(state);

    console.log(state)
    if (!failedValidation) {
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
    }
    else   alert('Where are incorrect fields!')
  };

  const errors: TransactionFormErrors = useSelector<State, TransactionFormErrors>(
    (s) => s.transactions.errors
  );

  const validate = (formState: IState) => {
    let error = false;
    if (!formState.amount) {
      error = true;
      dispatch(
        setTransactionFormErrors({
          prop: 'amount',
          error: 'This field must not be empty',
        })
      );
    }
    if (!formState.accountId) {
      error = true;
      dispatch(
        setTransactionFormErrors({
          prop: 'account',
          error: 'This field must not be empty',
        })
      );
    }
    if (!formState.category) {
      error = true;
      dispatch(
        setTransactionFormErrors({
          prop: 'category',
          error: 'This field must not be empty',
        })
      );
    }
    if (!formState.description) {
      error = true;
      dispatch(
        setTransactionFormErrors({
          prop: 'description',
          error: 'This field must not be empty',
        })
      );
    }
    if (!formState.date) {
      error = true;
      dispatch(
        setTransactionFormErrors({
          prop: 'date',
          error: 'This field must not be empty',
        })
      );
    }
    return error;
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
              <TextField
                id="amount"
                label="Amount"
                onChange={(e) => handleAmountChange(parseFloat(e.target.value))}
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? errors.name : undefined} />
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
                error={!!errors.name}
                onChange={(date) => { if (date) { handleDateChange(date) } }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth
              />
            </MuiPickersUtilsProvider>
            <FormControl fullWidth>
              <InputLabel id="categoryLabel">Category</InputLabel>

              <Select
                onChange={(e) => handleCategoryChange(e.target.value as number)}
                id="category"
                labelId="categoryLabel"
                fullWidth
                error={!!errors.name}>
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

            <TextField
              multiline
              label="Description"
              onChange={(e) => handleDescriptionChange(e.target.value)}
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name : undefined}
            />
            <FormControl fullWidth>
              <InputLabel id="accountLabel">Account</InputLabel>

              <Select
                onChange={(e) => handleAccountIdChange(e.target.value as number)}
                id="account"
                labelId="accountLabel"
                fullWidth
                error={!!errors.name}>
                <MenuItem value={1}>Cash</MenuItem>
              </Select>
 
              {errors.type ? (
                <FormHelperText error>{errors.type}</FormHelperText>
              ) : null}
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
