import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_QUESTIONS, updateIsLoading, updateQuestions } from './actions';
import { updateErrorMessage } from '../Contests/actions';
import { getProblemDetails, getQuestionCount } from '../../utils/web3ContractMethods';


export function* fetchQuestions(action) {
  try {
    yield put(updateIsLoading(true));
    const result = yield call(getQuestionCount, action.contestId);
    const questions = [];

    for (let questionId = 0; questionId < result; questionId += 1) {
      const question = yield call(getProblemDetails, action.contestId, questionId);
      console.log(question);
      questions.push({
        id: questionId,
        name: `Problem ${questionId + 1}\t\n`,
        solved: false
      });
    }
    yield put(updateQuestions(questions));
    yield put(updateIsLoading(false));
  } catch (err) {
    console.log(err);
    updateErrorMessage(err.toString());
  }
}

export default function* questionsSaga() {
  yield takeEvery(FETCH_QUESTIONS, fetchQuestions);
}
