export const FETCH_CONTESTS = 'FETCH_CONTESTS';
export function fetchContests() {
  return {
    type: FETCH_CONTESTS
  };
}

export const UPDATE_CONTESTS = 'UPDATE_CONTESTS';
export function updateContests(contests) {
  return {
    type: UPDATE_CONTESTS,
    contests
  };
}

export const REGISTER_CONTEST = 'REGISTER_CONTEST';
export function registerContest(contestId) {
  return {
    type: REGISTER_CONTEST,
    contestId
  };
}


export const UPDATE_ERROR_MESSAGE = 'UPDATE_ERROR_MESSAGE';
export function updateErrorMessage(msg) {
  return {
    type: UPDATE_ERROR_MESSAGE,
    msg
  };
}

export const UPDATE_IS_LOADING = 'UPDATE_IS_LOADING';
export function updateIsLoading(isLoading) {
  return {
    type: UPDATE_IS_LOADING,
    isLoading
  };
}
