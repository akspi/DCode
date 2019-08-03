import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { CREATE_CONTEST } from './actions';
import { addContest, addQuestion, getOngoingContest } from '../../utils/web3ContractMethods';
import { addFileToIpfs } from '../../utils/ipfsMethods';

const toastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export function* createContestSaga(action) {
  try {
    yield call(addContest, action.contestName);
    const nextContestId = yield call(getOngoingContest);
    const currentContestId = parseInt(nextContestId, 10) - 1;
    console.log(currentContestId);
    toast.info('Contest Created! Uploading Problems...', toastOptions);

    for (let i = 0; i < action.problems.length; i++) {
      const problem = action.problems[i];
      const problemIpfsHash = yield call(addFileToIpfs, problem.problemStatement);
      const inputIpfsHash = yield call(addFileToIpfs, problem.input);
      const outputIpfsHash = yield call(addFileToIpfs, problem.output, true);

      const result = yield call(addQuestion, currentContestId, problemIpfsHash, inputIpfsHash, outputIpfsHash);
      toast.info(`Uploaded Problem ${i + 1}`, toastOptions);
    }

    toast.success('Contest created successfully!', toastOptions);
    yield put(push('/'));
  } catch (err) {
    console.log(err);
    toast.error(err.toString(), toastOptions);
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
