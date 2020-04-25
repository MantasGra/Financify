import { all, fork } from 'redux-saga/effects';
import exampleSaga from './modules/example/sagas';
import accountsSaga from './modules/accounts/sagas';

// Combine all sagas from different modules.
function* rootSaga() {
  yield all([fork(exampleSaga), fork(accountsSaga)]);
}

export default rootSaga;
