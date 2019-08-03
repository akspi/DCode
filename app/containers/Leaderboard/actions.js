export const UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD';
export function updateLeaderboard(leaderboard) {
  return {
    type: UPDATE_LEADERBOARD,
    leaderboard
  };
}

export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export function fetchLeaderboard(contestId) {
  return {
    type: FETCH_LEADERBOARD,
    contestId
  };
}
