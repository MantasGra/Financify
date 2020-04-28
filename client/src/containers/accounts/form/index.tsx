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
import {
  AccountTypes,
  createAccount,
  AccountFormErrors,
  setAccountFormErrors,
  clearAccountFormErrors,
  AccountType,
  editAccount,
} from '../../../store/modules/accounts';
import style from './style.module.scss';
import Routes from '../../../utils/routes';

export interface IState {
  name: string;
  type?: number;
}

const AccountForm: React.FC = () => {
  const account = useSelector<State, AccountType | undefined>((s) => {
    return s.account.editId ? s.account.accounts[s.account.editId] : undefined;
  });

  const [state, setState] = React.useState<IState>({
    name: '',
    type: undefined,
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
  const handleTypeChange = (value: number) => {
    setState((prevState) => ({
      ...prevState,
      type: value,
    }));
  };

  const dispatch = useDispatch();

  const validate = (formState: IState) => {
    let error = false;
    if (!formState.name) {
      error = true;
      dispatch(
        setAccountFormErrors({
          prop: 'name',
          error: 'This field must not be empty',
        })
      );
    }
    if (!formState.type) {
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
    const failedValidation = validate(state);
    if (!failedValidation && state.type) {
      if (account) {
        dispatch(
          editAccount({
            accountForm: {
              id: account.id,
              name: state.name,
              type: state.type,
            },
            callback: () => changeRoute(Routes.Accounts),
          })
        );
      } else {
        dispatch(
          createAccount({
            accountForm: { name: state.name, type: state.type },
            callback: () => changeRoute(Routes.Accounts),
          })
        );
      }
    }
  };
  function buildAccountTypesArray() {
    return Object.keys(AccountTypes).filter(key => typeof AccountTypes[key as unknown as number] === 'number')
      .map(key => ({ id: AccountTypes[key as unknown as number].toString(), name: key }));
  }

  return (
    <Container>
      <div className={style.row}>
        <div className={style.column}>
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
                  value={state.type ? state.type : ''}
                  onChange={(e) => handleTypeChange(e.target.value as number)}
                  fullWidth
                  error={!!errors.type}
                >
                  {buildAccountTypesArray().map((key, val) => {
                    return (
                      <MenuItem
                        key={key.id}
                        value={key.id}
                      >
                        {key.name}
                      </MenuItem>
                    );
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
        </div>
      </div>
    </Container>
  );
};

export default AccountForm;
