import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_CONTESTS, updateContests } from './actions';


export function* fetchContests() {
  try {
    // const result = yield call(request, requestURL);
    // yield put(updateQuestions([]));
  } catch (err) {}
}

export default function* contestsSaga() {
  yield takeLatest(FETCH_CONTESTS, fetchContests);
}
