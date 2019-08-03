export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS';
export function updateQuestions(questions) {
  return {
    type: UPDATE_QUESTIONS,
    questions
  };
}

export const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING';
export function updateIsLoading(isLoading) {
  return {
    type: UPDATE_IS_LOADING,
    isLoading
  };
}

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export function fetchQuestions(contestId) {
  return {
    type: FETCH_QUESTIONS,
    contestId
  };
}
