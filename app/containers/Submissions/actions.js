export const FETCH_SUBMISSIONS = 'FETCH_SUBMISSIONS';
export function fetchSubmissions(contestId) {
  return {
    type: FETCH_SUBMISSIONS,
    contestId
  };
}

export const UPDATE_SUBMISSIONS = 'UPDATE_SUBMISSIONS';
export function updateSubmissions(submissions) {
  return {
    type: UPDATE_SUBMISSIONS,
    submissions
  };
}
