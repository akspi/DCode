import { put, call, takeEvery } from 'redux-saga/effects';
import { FETCH_SUBMISSIONS, updateSubmissions } from './actions';
import { updateErrorMessage } from '../Contests/actions';
import { getResolvedSubmission } from '../../utils/web3ContractMethods';


export function* fetchSubmissions(action) {
  try {
    console.log(action.contestId);
    const result = yield call(getResolvedSubmission, parseInt(action.contestId, 10));
    const submissions = [];
    console.log(result);

    for (let submissionId = 0; submissionId < result.arrayCount; submissionId += 1) {
      submissions.push({
        submissionTime: result.piArray[submissionId],
        problemName: `Submission ${submissionId}\t\n`,
        verdict: (result.rsArray[submissionId] == 1)? true: false
      });
    }
    console.log(submissions);
    yield put(updateSubmissions(submissions));
  } catch (err) {
    console.log(err);
    updateErrorMessage(err.toString());
  }
}

export default function* submissionsSaga() {
  yield takeEvery(FETCH_SUBMISSIONS, fetchSubmissions);
}
