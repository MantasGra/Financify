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
import { setSnackbar } from 'store/modules/global/actions';
import { useHistory } from 'react-router-dom';
import { AccountTypes } from '../../../store/modules/accounts';
import style from './style.module.scss';
import Routes from '../../../utils/routes';

const AccountCreate: React.FC = () => {
  const [type, setType] = React.useState('');

  const history = useHistory();
  const changeRoute = (route: string) => {
    history.push(route);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const dispatch = useDispatch();

  const handleSave = () => {
    changeRoute(Routes.Accounts);
    dispatch(
      setSnackbar({ severity: 'success', text: 'Account added succesfully' })
    );
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
              <TextField id="title" label="Title" fullWidth />
            </div>
            <div className={style.formField}>
              <FormControl fullWidth>
                <InputLabel id="typeLabel">Type</InputLabel>

                <Select
                  id="type"
                  labelId="typeLabel"
                  value={type || undefined}
                  onChange={handleChange}
                  fullWidth
                >
                  {Object.keys(AccountTypes).map((accountType) => {
                    if (isNaN(parseFloat(accountType)))
                      return (
                        <MenuItem key={accountType} value={accountType}>
                          {accountType}
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
