import React from 'react';
import {
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AccountTypes, createAccount } from '../../../store/modules/accounts';
import style from './style.module.scss';
import Routes from '../../../utils/routes';

export interface IState {
  name: string;
  type?: number;
}

const AccountCreate: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    name: '',
    type: undefined,
  });

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

  const handleSave = () => {
    // validate();
    if (!state.type) {
      // jabytute
    } else {
      dispatch(
        createAccount({
          accountForm: { name: state.name, type: state.type },
          callback: () => changeRoute(Routes.Accounts),
        })
      );
    }
  };

  return (
    <Container>
      <div className={style.row}>
        <div className={style.column}>
          <div className={style.title}>
            <h1>Create Account</h1>
          </div>
          <div className={style.formArea}>
            <div className={style.formField}>
              <TextField
                id="title"
                label="Title"
                fullWidth
                value={state.name}
                onChange={(e) => handleTitleChange(e.target.value)}
                error
              />
            </div>
            <div className={style.formField}>
              <FormControl fullWidth>
                <InputLabel id="typeLabel" error>
                  Type
                </InputLabel>

                <Select
                  id="type"
                  labelId="typeLabel"
                  value={state.type ? AccountTypes[state.type] : undefined}
                  onChange={(e) => handleTypeChange(e.target.value as number)}
                  fullWidth
                  error
                >
                  {Object.keys(AccountTypes).map((accountType) => {
                    if (!isNaN(parseFloat(accountType)))
                      return (
                        <MenuItem key={accountType} value={accountType}>
                          {AccountTypes[parseFloat(accountType)]}
                        </MenuItem>
                      );
                    return null;
                  })}
                </Select>
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

export default AccountCreate;
