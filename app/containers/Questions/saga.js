import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_QUESTIONS, updateQuestions } from './actions';


export function* fetchQuestions() {
  try {
    // const result = yield call(request, requestURL);
    // yield put(updateQuestions([]));
  } catch (err) {}
}

export default function* questionsSaga() {
  yield takeLatest(FETCH_QUESTIONS, fetchQuestions);
}
