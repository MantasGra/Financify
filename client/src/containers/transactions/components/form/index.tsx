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
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { TransactionCategories } from 'store/modules/transactions/types';
import style from './style.module.scss';

const TransactionCreate: React.FC = () => {
  const [type, setType] = React.useState('');

  const history = useHistory();
  const changeRoute = (route: string) => {
    history.push(route);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
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
              <TextField id="amount" label="Amount" fullWidth />
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
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                fullWidth
              />
            </MuiPickersUtilsProvider>
            <FormControl fullWidth>
              <InputLabel id="categoryLabel">Category</InputLabel>

              <Select id="category" labelId="categoryLabel" fullWidth>
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

            <TextField multiline label="Description" fullWidth />
            <FormControl fullWidth>
              <InputLabel id="categoryLabel">Account</InputLabel>

              <Select id="category" labelId="categoryLabel" fullWidth>
                <MenuItem value={1}>Cash</MenuItem>
              </Select>
            </FormControl>

            <div style={{ margin: 10 }}>
              <Button
                variant="contained"
                color="primary"
                className={style.button}
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
