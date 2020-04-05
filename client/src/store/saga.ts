import { all, fork } from 'redux-saga/effects';
import exampleSaga from './modules/example/sagas';

// Combine all sagas from different modules.
function* rootSaga() {
  yield all([fork(exampleSaga)]);
}

export default rootSaga;
