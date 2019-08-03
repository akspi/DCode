import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_SUBMISSIONS, updateSubmissions } from './actions';
import { updateErrorMessage } from '../Contests/actions';


export function* fetchSubmissions(contestId) {
  try {
    // const result = yield call(request, requestURL);
    // yield put(updateQuestions([]));
  } catch (err) {
    updateErrorMessage(err.toString());
  }
}

export default function* submissionsSaga() {
  yield takeLatest(FETCH_SUBMISSIONS, fetchSubmissions);
}
