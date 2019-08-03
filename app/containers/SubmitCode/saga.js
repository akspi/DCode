import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_QUESTIONS, SUBMIT_CODE, updateQuestions } from './actions';
import { getProblemDetails, getQuestionCount, submitEntry } from '../../utils/web3ContractMethods';
import { addFileToIpfs } from '../../utils/ipfsMethods';
import { toast } from 'react-toastify';

const toastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export function* fetchQuestions(action) {
  try {
    const result = yield call(getQuestionCount, action.contestId);
    const questions = [];

    for (let questionId = 0; questionId < result; questionId += 1) {
      const question = yield call(getProblemDetails, action.contestId, questionId);
      console.log(question);
      questions.push({
        id: questionId + 1,
        name: `Problem ${questionId + 1}\t\n`,
        solved: false
      });
    }
    yield put(updateQuestions(questions));
  } catch (err) {
    console.log(err);
  }
}

export function* submitCode(action) {
  try {
    const codeIpfsHash = yield call(addFileToIpfs, action.code);
    console.log(codeIpfsHash);
    yield call(submitEntry, action.contestId, codeIpfsHash, action.problemId);
    toast.success('Your code has been successfully submitted.', toastOptions);
  } catch (err) {
    console.log(err);
  }
}

export default function* questionsSaga() {
  yield takeEvery(FETCH_QUESTIONS, fetchQuestions);
  yield takeEvery(SUBMIT_CODE, submitCode);
}
