import { put, call, takeEvery } from 'redux-saga/effects';
import { FETCH_SUBMISSIONS, updateSubmissions } from './actions';
import { updateErrorMessage } from '../Contests/actions';
import { getResolvedSubmission } from '../../utils/web3ContractMethods';


export function* fetchSubmissions(action) {
  try {
    const result = yield call(getResolvedSubmission, parseInt(action.contestId, 10));
    const submissions = [];

    for (let submissionId = 0; submissionId < result.arrayCount; submissionId += 1) {
      submissions.push({
        submissionTime: submissionId,
        problemName: `Problem ${parseInt(result.piArray[submissionId],10) + 1}\t\n`,
        verdict: (result.rsArray[submissionId] == 1)? true: false
      });
    }
    yield put(updateSubmissions(submissions));
  } catch (err) {
    updateErrorMessage(err.toString());
  }
}

export default function* submissionsSaga() {
  yield takeEvery(FETCH_SUBMISSIONS, fetchSubmissions);
}
