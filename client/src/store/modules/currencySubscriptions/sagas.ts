import { toDictionary } from 'utils/parsers';
import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
import { CurrencySubscription, GET_CURRENCY_SUBSCRIPTIONS } from './types';
import * as actions from './actions';
import { getCurrencySubscriptions } from './requests';

function* getCurrencySubscriptionsSaga() {
  const currencySubscriptions: CurrencySubscription[] = yield call(
    getCurrencySubscriptions
  );
  yield put(actions.setCurrencySubscriptions(toDictionary(currencySubscriptions, 'id')));
}

function* getCurrencySubscriptionsWatcher() {
  yield takeEvery(GET_CURRENCY_SUBSCRIPTIONS, getCurrencySubscriptionsSaga);
}

function* rootSaga(){
  yield all([
    fork(getCurrencySubscriptionsWatcher)
  ]);
}

export default rootSaga;