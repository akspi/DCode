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
