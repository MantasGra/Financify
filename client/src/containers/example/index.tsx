import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import TextInputExample from './components/TextInputExample';
import style from './style.module.scss';
import { State } from '../../store';
import { getRandomFact } from '../../store/modules/example/actions';

const Example: React.FC = () => {
  // Select the random fact from redux state.
  const randomFact = useSelector<State, string>(
    (state) => state.example.randomFact
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    // Dispatch action which is watched by saga.
    dispatch(getRandomFact());
  };
  return (
    <div className={style.row}>
      <div className={style.column}>
        <div className={style.title}>
          <Typography variant="h6">
            Try typing something in the text fields below!
          </Typography>
        </div>
        <TextInputExample />
        <TextInputExample useRedux />
      </div>
      <div className={style.column}>
        <div className={style.title}>
          <Typography variant="h6">
            Press button below to generate a random fact!
          </Typography>
          <div className={style.buttonContainer}>
            <Button variant="contained" onClick={handleClick}>
              Generate
            </Button>
          </div>
          <div className={style.text}>{randomFact}</div>
        </div>
      </div>
    </div>
  );
};

export default Example;
