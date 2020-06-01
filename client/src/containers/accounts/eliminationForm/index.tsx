import React from 'react';
import {
  TextField,
  Button,
  Container,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { State } from 'store';
import Routes from 'utils/routes';
import {
  AccountSelectOption,
  getAccountSelectOptions,
  createEliminatingTransaction,
  EliminationFormErrors,
  setEliminationFormErrors,
} from 'store/modules/accounts';
import style from './style.module.scss';
import { Autocomplete } from '@material-ui/lab';

export interface IState {
    accountOption: AccountSelectOption | null;
    accountSelectInput: string;
    newValue: number |'';
}

const EliminatingForm: React.FC = () => {
 

  const [state, setState] = React.useState<IState>({
    newValue: '',
    accountOption: null,
    accountSelectInput: '',

  });


  const history = useHistory();
  const changeRoute = (route: string) => {
    history.push(route);
  };

  const handleNewValueChange = (newValue: number) => {
    setState((prevState) => ({
      ...prevState,
      newValue,
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

  const handleAccountInputChange = (input: string) => {
    dispatch(getAccountSelectOptions(input));
    setState((prevState) => ({ ...prevState, accountSelectInput: input }));
  };

  const dispatch = useDispatch();

  const errors: EliminationFormErrors = useSelector<State, EliminationFormErrors>(
    (s) => s.account.eliminationErrors
  );


  const validate = () => {
    let error = false;
    console.log(state);
     if (!state.newValue) {
      error = true;
      dispatch(
        setEliminationFormErrors({
          prop: 'newValue',
          error: 'This field must not be empty',
        })
      );
    }
    if (!state.accountOption) {
      error = true;
      dispatch(
        setEliminationFormErrors({
          prop: 'accountId',
          error: 'This field must not be empty',
        })
      );
    }
    return error;
  };
  const accountSelectOptions = useSelector<State, AccountSelectOption[]>(
    (store) => store.account.selectOptions
  );


  const handleSave = () => {
    const failedValidation = validate();
    if (!failedValidation && state.accountOption && state.newValue !== '') {
        dispatch(createEliminatingTransaction({accountId: state.accountOption.id, newValue: state.newValue}));
        changeRoute(Routes.Accounts);
        
        
    }};

    return (
        <Container>
          <div className={style.title}>
            <h1>Create eliminating transaction</h1>
          </div>
          <div className={style.formArea}>
            <div className={style.formField}>
              <TextField
                id="newValue"
                label="New Value"
                onChange={(e) => handleNewValueChange(parseFloat(e.target.value))}
                fullWidth
                type="number"
                error={!!errors.newValue}
                helperText={errors.newValue ? errors.newValue : undefined}
                value={state.newValue}
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
                    error={!!errors.accountId}
                    helperText={errors.accountId ? errors.accountId : undefined}
                  />
                )}
                onFocus={() =>
                  dispatch(getAccountSelectOptions(state.accountSelectInput))
                }
              />
            </div>
              <div className={style.buttonContainer}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Submit
                </Button>
              </div>
            </div>
        </Container>
      );
    };
export default EliminatingForm;
