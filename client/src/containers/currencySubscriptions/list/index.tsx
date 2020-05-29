import React from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencySubscriptions, CurrencySubscription } from 'store/modules/currencySubscriptions';
import { State } from 'store';

const CurrencySubscriptions: React.FC = () => {
  const currencySubscriptions: CurrencySubscription[] = useSelector<
  State,
  CurrencySubscription[]
  >((state) => {
    return Object.keys(state.currencySubscription.currencySubscriptions).map(
      (key) => state.currencySubscription.currencySubscriptions[key],
    );
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCurrencySubscriptions());
  }, [dispatch]);
  return (
    <Container>
      <span style={{ color: 'white', fontSize: 'smaller' }}>Fuck yo choose</span>
      <ul>
        {currencySubscriptions.map(row => (
          <li key={row.id}>{row.currency}</li>
        ))}
      </ul>
    </Container>
  );
};

export default CurrencySubscriptions;