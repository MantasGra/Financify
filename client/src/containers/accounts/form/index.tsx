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
import {
  AccountTypes,
  createAccount,
  AccountFormErrors,
  setAccountFormErrors,
  clearAccountFormErrors,
  AccountType,
  editAccount,
} from 'store/modules/accounts';
import style from './style.module.scss';

export interface IState {
  name: string;
  type: AccountTypes | '';
}

const AccountForm: React.FC = () => {
  const account = useSelector<State, AccountType | undefined>((s) =>
    s.account.editId ? s.account.accounts[s.account.editId] : undefined
  );

  const [state, setState] = React.useState<IState>({
    name: '',
    type: '',
  });

  React.useEffect(() => {
    if (account) {
      setState({ name: account.name, type: account.type });
    }
  }, [account]);

  const errors: AccountFormErrors = useSelector<State, AccountFormErrors>(
    (s) => s.account.errors
  );

  const history = useHistory();
  const changeRoute = (route: string) => {
    history.push(route);
  };

  const handleTitleChange = (value: string) => {
    setState((prevState) => ({ ...prevState, name: value }));
  };
  const handleTypeChange = (value: AccountTypes) => {
    setState((prevState) => ({
      ...prevState,
      type: value,
    }));
  };

  const dispatch = useDispatch();

  const validate = () => {
    let error = false;
    if (!state.name) {
      error = true;
      dispatch(
        setAccountFormErrors({
          prop: 'name',
          error: 'This field must not be empty',
        })
      );
    }
    if (state.type === '') {
      error = true;
      dispatch(
        setAccountFormErrors({
          prop: 'type',
          error: 'This field must not be empty',
        })
      );
    }
    return error;
  };

  const handleSave = () => {
    dispatch(clearAccountFormErrors());
    const failedValidation = validate();
    if (!failedValidation && state.type !== '') {
      if (account) {
        dispatch(
          editAccount({
            accountForm: {
              id: account.id,
              ...(state as AccountType),
            },
            callback: () => changeRoute(Routes.Accounts),
          })
        );
      } else {
        dispatch(
          createAccount({
            accountForm: state as AccountType,
            callback: () => changeRoute(Routes.Accounts),
          })
        );
      }
    }
  };

  return (
    <Container>
      <div className={style.title}>
        <h1>{account ? 'Edit' : 'Create'} Account</h1>
      </div>
      <div className={style.formArea}>
        <div className={style.formField}>
          <TextField
            id="title"
            label="Title"
            fullWidth
            value={state.name}
            onChange={(e) => handleTitleChange(e.target.value)}
            error={!!errors.name}
            helperText={errors.name ? errors.name : undefined}
          />
        </div>
        <div className={style.formField}>
          <FormControl fullWidth>
            <InputLabel id="typeLabel" error={!!errors.type}>
              Type
            </InputLabel>

            <Select
              id="type"
              labelId="typeLabel"
              value={state.type}
              onChange={(e) => handleTypeChange(e.target.value as AccountTypes)}
              fullWidth
              error={!!errors.type}
            >
              {Object.keys(AccountTypes).map((type) => {
                if (!isNaN(parseFloat(type))) {
                  return (
                    <MenuItem key={type} value={parseFloat(type)}>
                      {AccountTypes[parseFloat(type)]}
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Select>
            {errors.type ? (
              <FormHelperText error>{errors.type}</FormHelperText>
            ) : null}
          </FormControl>
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

export default AccountForm;
