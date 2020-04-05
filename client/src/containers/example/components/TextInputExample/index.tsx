import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../../../store';
import { setText as setTextRedux } from '../../../../store/modules/example';
import style from './style.module.scss';

interface Props {
  useRedux?: boolean;
}

const TextInputExample: React.FC<Props> = ({ useRedux }) => {
  // Declaring usage of state with initial value.
  const [text, setText] = React.useState<string>('');

  // Declaring usage of state in redux.
  // Note: this is just an example form field state should probobly be handled locally.
  const textRedux = useSelector<State, string>(
    (state) => state.example.textObject.text
  );
  // Declaring usage of dispatch in redux;
  const dispatch = useDispatch();

  // Declaring change handler for local state.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  // Declaring change handler for redux state.
  const handleChangeRedux = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTextRedux({ text: event.target.value }));
  };

  // Note the use of conditional statements in components.
  return (
    <div className={style.flexContainer}>
      <div className={style.buttonContainer}>
        <TextField
          label={
            useRedux ? 'Redux managed text field' : 'State managed text field'
          }
          value={useRedux ? textRedux : text}
          onChange={useRedux ? handleChangeRedux : handleChange}
          variant="outlined"
        />
      </div>
      <div>{useRedux ? textRedux : text}</div>
    </div>
  );
};

export default TextInputExample;
