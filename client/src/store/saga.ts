import { all, fork } from 'redux-saga/effects';
import accountsSaga from './modules/accounts/sagas';
import transactionsSaga from './modules/transactions/sagas';
// Combine all sagas from different modules.
function* rootSaga() {
  yield all([fork(accountsSaga), fork(transactionsSaga)]);
}

export default rootSaga;
