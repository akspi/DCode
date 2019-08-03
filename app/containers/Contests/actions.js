export const FETCH_CONTESTS = 'FETCH_CONTESTS';
export function fetchContests() {
  return {
    type: FETCH_CONTESTS
  };
}

export const UPDATE_CONTESTS = 'UPDATE_CONTESTS';
export function updateContests() {
  return {
    type: UPDATE_CONTESTS
  };
}

export const REGISTER_CONTEST = 'REGISTER_CONTEST';
export function registerContest(contestId) {
  return {
    type: REGISTER_CONTEST,
    contestId
  };
}
