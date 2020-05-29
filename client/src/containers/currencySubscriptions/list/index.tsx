import React from 'react';
import { Container, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencySubscriptions, CurrencySubscription } from 'store/modules/currencySubscriptions';
import { State } from 'store';
import Routes from 'utils/routes';
import { useHistory } from 'react-router-dom';
import style from './style.module.scss';

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

  const handleCreate = () => {
    changeRoute(Routes.CurrencySubscriptionCreate);
  };

  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };

  return (
    <Container>
      <h1>Your Currency Subscriptions</h1>
      {currencySubscriptions.length > 0 ?
        <ul>
          {currencySubscriptions.map(row => (
            <li key={row.id}>{row.currency}</li>
          ))}
        </ul>
        : <span>You don't have any currency subscriptions yet.</span>}
      <Fab
        size="medium"
        color="secondary"
        aria-label="add"
        className={style.fab}
        onClick={handleCreate}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default CurrencySubscriptions;