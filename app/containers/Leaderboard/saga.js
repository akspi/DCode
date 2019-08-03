import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_LEADERBOARD } from './actions';
import { updateErrorMessage } from '../Contests/actions';


export function* fetchLeaderboard(contestId) {
  try {
    // const result = yield call(request, requestURL);
    // yield put(updateQuestions([]));
  } catch (err) {
    yield put(updateErrorMessage(err.toString()));
  }
}

export default function* leaderboardSaga() {
  yield takeLatest(FETCH_LEADERBOARD, fetchLeaderboard);
}
