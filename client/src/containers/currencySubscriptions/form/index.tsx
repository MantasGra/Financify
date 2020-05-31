import React from 'react';
import {
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { State } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import {
  CurrencySubscription,
  CurrencySubscriptionCurrencies,
  CurrencySubscriptionFormErrors,
  clearCurrencySubscriptionFormErrors,
  setCurrencySubscriptionFormErrors,
  createCurrencySubscription,
} from 'store/modules/currencySubscriptions';
import { useHistory } from 'react-router-dom';
import Routes from 'utils/routes';
import style from './style.module.scss';

export interface IState {
  currency: CurrencySubscriptionCurrencies | '';
}

const CurrencySubscriptionForm: React.FC = () => {
  const currencySubscription = useSelector<
    State,
    CurrencySubscription | undefined
  >((s) => undefined);

  const [state, setState] = React.useState<IState>({
    currency: '',
  });

  React.useEffect(() => {
    if (currencySubscription) {
      setState({ currency: currencySubscription.currency });
    }
  }, [currencySubscription]);

  const errors: CurrencySubscriptionFormErrors = useSelector<
    State,
    CurrencySubscriptionFormErrors
  >((s) => s.currencySubscription.errors);

  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };

  const handleCurrencyChange = (value: CurrencySubscriptionCurrencies) => {
    setState((prevState) => ({
      ...prevState,
      currency: value,
    }));
  };

  const dispatch = useDispatch();

  const handleToList = () => {
    history.goBack();
  };

  const handleSave = () => {
    dispatch(clearCurrencySubscriptionFormErrors());
    const failedValidation = validate();
    if (!failedValidation && state.currency !== '') {
      dispatch(
        createCurrencySubscription({
          currencySubscriptionForm: {
            currency: state.currency,
          },
          callback: () => changeRoute(Routes.CurrencySubscriptions),
        })
      );
    }
  };

  const validate = () => {
    let error = false;
    if (state.currency === '') {
      error = true;
      dispatch(
        setCurrencySubscriptionFormErrors({
          prop: 'currency',
          error: 'This field must not be empty',
        })
      );
    }
    return error;
  };

  return (
    <Container>
      <h1>Subscribe to currency</h1>
      <div className={style.Form__Container}>
        <FormControl fullWidth>
          <InputLabel id="currencyLabel" error={!!errors.currency}>
            Currency
          </InputLabel>

          <Select
            id="currency"
            labelId="currencyLabel"
            value={state.currency}
            onChange={(e) =>
              handleCurrencyChange(
                e.target.value as CurrencySubscriptionCurrencies
              )
            }
            fullWidth
          >
            {Object.keys(CurrencySubscriptionCurrencies).map((type) => {
              if (!isNaN(parseFloat(type))) {
                return (
                  <MenuItem key={type} value={parseFloat(type)}>
                    {CurrencySubscriptionCurrencies[parseFloat(type)]}
                  </MenuItem>
                );
              }
              return null;
            })}
          </Select>
          {errors.currency ? (
            <FormHelperText error>{errors.currency}</FormHelperText>
          ) : null}
        </FormControl>
        <div className={style.Form__ActionContainer}>
          <Button
            className={style.Form__Button}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Submit
          </Button>
          <Button
            className={style.Form__Button}
            color="primary"
            onClick={handleToList}
          >
            Back to list
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CurrencySubscriptionForm;
