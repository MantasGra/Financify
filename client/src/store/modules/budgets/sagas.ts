import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { toDictionary } from 'utils/parsers';
import * as actions from './actions';
import * as globalActions from '../global/actions';
import { getBudgets, createBudget, getRecommendedBudgets } from './requests';
import {
  GET_BUDGETS,
  Budget,
  CREATE_BUDGET,
  GET_RECOMMENDED_BUDGETS,
} from './types';

// The function* syntax is required here, because sagas are based on generator functions.

// Actual worker saga which does something, when an action is dispatched.
function* getBudgetsSaga() {
  const budgets: Budget[] = yield call(getBudgets);
  yield put(actions.setBudgets(toDictionary(budgets, 'id')));
}

// Watcher saga which watches for dispatched actions.
function* getBudgetsWatcher() {
  yield takeEvery(GET_BUDGETS, getBudgetsSaga);
}

function* createBudgetSaga(action: ReturnType<typeof actions.createBudget>) {
  const budget: Budget = yield call(createBudget, action.payload.budgetForm);
  if (budget) {
    yield put(actions.storeAddBudget(budget));
    if (action.payload) {
      yield call(action.payload.callback);
    }
    yield put(
      globalActions.setSnackbar({
        severity: 'success',
        text: 'Budget succesfully created',
        isOpen: true,
      })
    );
  }
}

function* createBudgetWatcher() {
  yield takeEvery(CREATE_BUDGET, createBudgetSaga);
}

function* getRecommendedBudgetsSaga() {
  const budgets: Budget[] = yield call(getRecommendedBudgets);
  yield put(actions.setRecommendedBudgets(toDictionary(budgets, 'id')));
}

// Watcher saga which watches for dispatched actions.
function* getRecommendedBudgetsWatcher() {
  yield takeEvery(GET_RECOMMENDED_BUDGETS, getRecommendedBudgetsSaga);
}

// Combine all watchers to work on parallel with fork for exporting.

function* rootSaga() {
  yield all([
    fork(getBudgetsWatcher),
    fork(createBudgetWatcher),
    fork(getRecommendedBudgetsWatcher),
  ]);
}

export default rootSaga;
