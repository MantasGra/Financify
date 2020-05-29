import { toDictionary } from 'utils/parsers';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import * as globalActions from '../global/actions';
import { CurrencySubscription, GET_CURRENCY_SUBSCRIPTIONS, CREATE_CURRENCY_SUBSCRIPTION } from './types';
import * as actions from './actions';
import { getCurrencySubscriptions, createCurrencySubscription } from './requests';

function* getCurrencySubscriptionsSaga() {
  const currencySubscriptions: CurrencySubscription[] = yield call(
    getCurrencySubscriptions
  );
  yield put(actions.setCurrencySubscriptions(toDictionary(currencySubscriptions, 'id')));
}

function* getCurrencySubscriptionsWatcher() {
  yield takeEvery(GET_CURRENCY_SUBSCRIPTIONS, getCurrencySubscriptionsSaga);
}

function* createCurrencySubscriptionSaga(
  action: ReturnType<typeof actions.createCurrencySubscription>
) {
  const currencySubscription: CurrencySubscription = yield call(
    createCurrencySubscription,
    action.payload.currencySubscriptionForm
  );
  if (currencySubscription) {
    yield put(actions.storeAddCurrencySubscription(currencySubscription));
    if (action.payload) {
      yield call(action.payload.callback);
    }
    yield put(
      globalActions.setSnackbar({
        severity: 'success',
        text: 'Currency subscription succesfully created',
        isOpen: true,
      })
    );
  }
}

function* createCurrencySubscriptionWatcher() {
  yield takeEvery(CREATE_CURRENCY_SUBSCRIPTION, createCurrencySubscriptionSaga);
}

function* rootSaga(){
  yield all([
    fork(getCurrencySubscriptionsWatcher),
    fork(createCurrencySubscriptionWatcher),
  ]);
}

export default rootSaga;