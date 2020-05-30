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
import { State } from 'store';
import Routes from 'utils/routes';
import { Budget, BudgetFormErrors } from 'store/modules/budgets/types';
import { TransactionCategories } from 'store/modules/transactions';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  setBudgetFormErrors,
  clearBudgetFormErrors,
  createBudget,
} from 'store/modules/budgets';
import style from './style.module.scss';

export interface IState {
  amount: number;
  category: TransactionCategories | '';
  dateFrom: Date;
  dateTo: Date;
}

const BudgetForm: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    amount: 0,
    category: '',
    dateFrom: new Date() as Date,
    dateTo: new Date() as Date,
  });

  const errors: BudgetFormErrors = useSelector<State, BudgetFormErrors>(
    (s) => s.budget.errors
  );

  const history = useHistory();
  const changeRoute = (route: string) => {
    history.push(route);
  };

  const handleAmountChange = (value: number) => {
    setState((prevState) => ({ ...prevState, amount: value }));
  };

  const handleCategoryChange = (category: TransactionCategories) => {
    setState((prevState) => ({
      ...prevState,
      category,
    }));
  };

  const handleDateFromChange = (value: Date) => {
    setState((prevState) => ({
      ...prevState,
      dateFrom: value,
    }));
  };

  const handleDateToChange = (value: Date) => {
    setState((prevState) => ({
      ...prevState,
      dateTo: value,
    }));
  };

  const dispatch = useDispatch();

  const validate = () => {
    let error = false;
    if (!state.amount) {
      error = true;
      dispatch(
        setBudgetFormErrors({
          prop: 'amount',
          error: 'This field must not be empty',
        })
      );
    }
    if (state.category === '') {
      error = true;
      dispatch(
        setBudgetFormErrors({
          prop: 'category',
          error: 'This field must not be empty',
        })
      );
    }
    if (!state.dateFrom) {
      error = true;
      dispatch(
        setBudgetFormErrors({
          prop: 'dateFrom',
          error: 'This field must not be empty',
        })
      );
    }
    if (!state.dateTo) {
      error = true;
      dispatch(
        setBudgetFormErrors({
          prop: 'dateTo',
          error: 'This field must not be empty',
        })
      );
    }
    return error;
  };

  const handleSave = () => {
    dispatch(clearBudgetFormErrors());
    const failedValidation = validate();
    if (!failedValidation) {
      dispatch(
        createBudget({
          budgetForm: state as Budget,
          callback: () => changeRoute(Routes.Budgets),
        })
      );
    }
  };

  return (
    <Container>
      <div className={style.title}>
        <h1>Create Budget</h1>
      </div>
      <div className={style.formArea}>
        <div className={style.formField}>
          <TextField
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={state.amount}
            onChange={(e) => handleAmountChange(parseFloat(e.target.value))}
            error={!!errors.amount}
            helperText={errors.amount ? errors.amount : undefined}
          />
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date From"
              value={state.dateFrom}
              error={!!errors.dateFrom}
              helperText={errors.dateFrom ? errors.dateFrom : undefined}
              onChange={(date) => {
                if (date) {
                  handleDateFromChange(date);
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date To"
              value={state.dateTo}
              error={!!errors.dateTo}
              helperText={errors.dateTo ? errors.dateTo : undefined}
              onChange={(date) => {
                if (date) {
                  handleDateToChange(date);
                }
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={style.button}
          onClick={handleSave}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default BudgetForm;
