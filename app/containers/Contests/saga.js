import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_CONTESTS, REGISTER_CONTEST, updateContests, updateErrorMessage } from './actions';
import { getContestDetails, getOngoingContest } from '../../utils/web3ContractMethods';
import { updateQuestions } from '../Questions/actions';


export function* fetchContests() {
  try {
    const result = yield call(getOngoingContest);
    const contests = [];

    for (let contestId = 0; contestId < result; contestId += 1) {
      const contest = yield call(getContestDetails, contestId);
      contests.push({
        id: contestId,
        name: contest.contestName,
        date: '03/07/19',
        participants: parseInt(contest.registraionCount, 10),
        registered: true
      });
    }

    console.log(contests);

    yield put(updateContests(contests));
  } catch (err) {
    yield put(updateErrorMessage(err.toString()));
  }
}

export function* registerContest(registerId) {
  try {
    // const result = yield call(request, requestURL);
    // yield put(updateQuestions([]));
  } catch (err) {
    yield put(updateErrorMessage(err.toString()));
  }
}

export default function* contestsSaga() {
  yield takeEvery(FETCH_CONTESTS, fetchContests);
}
