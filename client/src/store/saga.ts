import { all, fork } from 'redux-saga/effects';
import accountsSaga from './modules/accounts/sagas';
import transactionsSaga from './modules/transactions/sagas';
import reportsSaga from './modules/reports/sagas';
import currencySubscriptionsSaga from './modules/currencySubscriptions/sagas';
// Combine all sagas from different modules.
function* rootSaga() {
  yield all([
    fork(accountsSaga),
    fork(transactionsSaga),
    fork(currencySubscriptionsSaga),
    fork(reportsSaga),
  ]);
}

export default rootSaga;
