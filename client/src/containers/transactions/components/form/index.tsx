/* eslint @typescript-eslint/indent: 0,
   react/jsx-curly-newline: 0 */ // Linter and prettier conflicts, should be fixed.
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
import { Autocomplete } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { State } from 'store';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  TransactionCategories,
  Transaction,
  createTransaction,
  TransactionFormErrors,
  setTransactionFormErrors,
  clearTransactionFormErrors,
  editTransaction,
} from 'store/modules/transactions';
import Routes from 'utils/routes';
import {
  AccountSelectOption,
  getAccountSelectOptions,
} from 'store/modules/accounts';
import style from './style.module.scss';

interface IState {
  amount: number | '';
  date: Date;
  category: TransactionCategories | '';
  description: string;
  accountOption: AccountSelectOption | null;
  accountSelectInput: string;
}

const TransactionForm: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    amount: '',
    date: new Date(),
    description: '',
    category: '',
    accountOption: null,
    accountSelectInput: '',
  });

  const history = useHistory();
  const changeRoute = (route: Routes) => {
    history.push(route);
  };

  // handlers are all the same, should be generalized perhaps
  const handleDateChange = (date: Date) => {
    setState((prevState) => ({
      ...prevState,
      date,
    }));
  };

  const handleAmountChange = (amount: number) => {
    setState((prevState) => ({
      ...prevState,
      amount,
    }));
  };

  const handleCategoryChange = (category: TransactionCategories) => {
    setState((prevState) => ({
      ...prevState,
      category,
    }));
  };

  const handleDescriptionChange = (description: string) => {
    setState((prevState) => ({
      ...prevState,
      description,
    }));
  };

  const handleAccountOptionChange = (
    accountOption: AccountSelectOption | null
  ) => {
    setState((prevState) => ({
      ...prevState,
      accountOption,
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleAccountInputChange = (input: string) => {
    dispatch(getAccountSelectOptions(input));
    setState((prevState) => ({ ...prevState, accountSelectInput: input }));
  };

  const accountSelectOptions = useSelector<State, AccountSelectOption[]>(
    (store) => store.account.selectOptions
  );

  const transaction = useSelector<State, Transaction | undefined>(
    (store) =>
      store.transactions.transactions[store.transactions.editTransactionId]
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (transaction) {
      setState({
        amount: transaction.amount,
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        accountOption: {
          label: transaction.account.name,
          id: transaction.account.id,
        },
        accountSelectInput: '',
      });
    }
  }, [transaction]);

  const handleSave = () => {
    dispatch(clearTransactionFormErrors());
    const failedValidation = validate();
    if (
      transaction &&
      !failedValidation &&
      state.accountOption &&
      state.category !== '' &&
      state.amount !== ''
    ) {
      dispatch(
        editTransaction({
          transactionForm: {
            amount: state.amount,
            date: state.date,
            category: state.category,
            description: state.description,
            accountId: state.accountOption.id,
            id: transaction.id,
          },
          callback: () => changeRoute(Routes.Transactions),
        })
      );
    } else if (
      !failedValidation &&
      state.accountOption &&
      state.category !== '' &&
      state.amount !== ''
    ) {
      dispatch(
        createTransaction({
          transactionForm: {
            amount: state.amount,
            date: state.date,
            category: state.category,
            description: state.description,
            accountId: state.accountOption.id,
          },
          callback: () => changeRoute(Routes.Transactions),
        })
      );
    }
  };

  const errors: TransactionFormErrors = useSelector<
    State,
    TransactionFormErrors
  >((s) => s.transactions.errors);

  const validate = () => {
    let error = false;
    // weak validation
    if (!state.amount) {
      error = true;
      dispatch(
        setTransactionFormErrors({
          prop: 'amount',
          error: 'This field must not be empty',
        })
      );
    }
    if (!state.accountOption) {
      error = true;
      dispatch(
        setTransactionFormErrors({
          prop: 'account',
          error: 'This field must not be empty',
        })
      );
    }
    if (state.category === '') {
      error = true;
      dispatch(
        setTransactionFormErrors({
          prop: 'category',
          error: 'This field must not be empty',
        })
      );
    }
    if (!state.description) {
      error = true;
      dispatch(
        setTransactionFormErrors({
          prop: 'description',
          error: 'This field must not be empty',
        })
      );
    }
    if (!state.date) {
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
      <div className={style.title}>
        <h1>{transaction ? 'Edit' : 'Create'} Transaction</h1>
      </div>
      <div className={style.formArea}>
        <div className={style.formField}>
          <TextField
            id="amount"
            label="Amount"
            onChange={(e) => handleAmountChange(parseFloat(e.target.value))}
            fullWidth
            error={!!errors.amount}
            helperText={errors.amount ? errors.amount : undefined}
            type="number"
            value={state.amount}
          />
        </div>
        <div className={style.formField}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              value={state.date}
              error={!!errors.date}
              helperText={errors.date ? errors.date : undefined}
              onChange={(date) => {
                if (date) {
                  handleDateChange(date);
                }
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={style.formField}>
          <FormControl fullWidth>
            <InputLabel id="categoryLabel" error={!!errors.category}>
              Category
            </InputLabel>

            <Select
              onChange={(e) => handleCategoryChange(e.target.value as number)}
              id="category"
              labelId="categoryLabel"
              fullWidth
              error={!!errors.category}
              value={state.category}
            >
              {Object.keys(TransactionCategories).map((category) => {
                if (!isNaN(parseFloat(category)))
                  return (
                    <MenuItem key={category} value={parseFloat(category)}>
                      {TransactionCategories[parseFloat(category)]}
                    </MenuItem>
                  );
                return null;
              })}
            </Select>
            {errors.category ? (
              <FormHelperText error>{errors.category}</FormHelperText>
            ) : null}
          </FormControl>
        </div>
        <div className={style.formField}>
          <TextField
            multiline
            label="Description"
            onChange={(e) => handleDescriptionChange(e.target.value)}
            fullWidth
            error={!!errors.description}
            helperText={errors.description ? errors.description : undefined}
            value={state.description}
          />
        </div>
        <div className={style.formField}>
          <Autocomplete
            options={accountSelectOptions}
            onChange={(event: object, value: AccountSelectOption | null) =>
              handleAccountOptionChange(value)
            }
            onInputChange={(event: object, value: string) =>
              handleAccountInputChange(value)
            }
            value={state.accountOption}
            inputValue={state.accountSelectInput}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) =>
              value && option.id === value.id
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Account"
                error={!!errors.account}
                helperText={errors.account ? errors.account : undefined}
              />
            )}
            onFocus={() =>
              dispatch(getAccountSelectOptions(state.accountSelectInput))
            }
          />
        </div>
        <div className={style.actionsContainer}>
          <div className={style.buttonContainer}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Submit
            </Button>
          </div>
          <div className={style.buttonContainer}>
            <Button variant="text" color="secondary" onClick={handleBack}>
              Back to list
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TransactionForm;
