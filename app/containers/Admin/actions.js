export const CREATE_CONTEST = 'CREATE_CONTEST';
export function createContest(contestName, problems) {
  return {
    type: CREATE_CONTEST,
    contestName,
    problems
  };
}
