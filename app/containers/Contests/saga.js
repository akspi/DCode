import {
  call, put, select, takeEvery
} from 'redux-saga/effects';
import {
  FETCH_CONTESTS, REGISTER_CONTEST, updateContests, updateErrorMessage, updateIsLoading,
} from './actions';
import { getContestDetails, getOngoingContest, registerUser } from '../../utils/web3ContractMethods';
import { toast } from 'react-toastify';

const toastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};


export const getContestState = (state) => state.contests;

export function* fetchContests() {
  try {
    yield put(updateIsLoading(true));
    const result = yield call(getOngoingContest);
    const contests = [];

    for (let contestId = 0; contestId < result; contestId += 1) {
      const contest = yield call(getContestDetails, contestId);
      contests.push({
        id: contestId,
        name: contest.contestName,
        date: '03/07/19',
        participants: parseInt(contest.registraionCount, 10),
        registered: parseInt(contest.isUserRegistered, 10) !== 0
      });
    }

    yield put(updateContests(contests));
    yield put(updateIsLoading(false));
  } catch (err) {
    console.log(err);
    yield put(updateErrorMessage(err.toString()));
  }
}

export function* registerContest(action) {
  try {
    const result = yield call(registerUser, action.contestId);
    yield call(fetchContests);
    toast.success('Registered for contest successfully!', toastOptions);
  } catch (err) {
    console.log(err);
    // yield put(updateErrorMessage(err.toString()));
  }
}

export default function* contestsSaga() {
  yield takeEvery(FETCH_CONTESTS, fetchContests);
  yield takeEvery(REGISTER_CONTEST, registerContest);
}
