import React from 'react';
import {
  Container,
  Fab,
  Card,
  CardHeader,
  CardActions,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrencySubscriptions,
  CurrencySubscription,
} from 'store/modules/currencySubscriptions';
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
      (key) => state.currencySubscription.currencySubscriptions[key]
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
      {currencySubscriptions.length > 0 ? (
        <div className={style.List__Container}>
          {currencySubscriptions.map((row) => (
            <Card className={style.List__Card} key={row.id}>
              <CardHeader title={row.currency} subheader="Currency" />
              <CardActions>
                <Button color="secondary">Unsubscribe</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      ) : (
        <span>You don't have any currency subscriptions yet.</span>
      )}
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
