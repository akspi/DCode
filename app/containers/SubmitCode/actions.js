export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';
export function updateQuestions(questions) {
  return {
    type: UPDATE_QUESTIONS,
    questions
  };
}

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export function fetchQuestions(contestId) {
  return {
    type: FETCH_QUESTIONS,
    contestId
  };
}

export const SUBMIT_CODE = 'SUBMIT_CODE';
export function submitCode(contestId, problemId, code) {
  return {
    type: SUBMIT_CODE,
    contestId,
    problemId,
    code
  };
}
