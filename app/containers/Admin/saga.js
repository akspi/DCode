import { call, takeEvery } from 'redux-saga/effects';
import { CREATE_CONTEST } from './actions';
import { addContest } from '../../utils/web3ContractMethods';

export function* createContestSaga(action) {
  try {
    const nextContestId = yield call(addContest, action.contestName);
    const currentContestId = nextContestId - 1;

    action.problems.forEach((problem) => {
      console.log(problem);
    });

  } catch (err) {
    // yield put(updateErrorMessage(err.toString()));
  }
}

export function* addProblem(action) {
  try {
    const result = yield call(addQuestion, action.contestName);
    console.log(result);
  } catch (err) {
    // yield put(updateErrorMessage(err.toString()));
  }
}

export default function* contestsSaga() {
  yield takeEvery(CREATE_CONTEST, createContestSaga);
}
