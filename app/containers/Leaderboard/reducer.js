import { UPDATE_LEADERBOARD } from './actions';

// The initial state of the App
const initialState = {
  leaderboard: [{
    address: '0xcd959e71449425f6e4ac814b7f5aebde93012e24',
  }, {
    address: '0xc257274276a4e539741ca11b590b9447b26a8051',
  }, {
    address: '0x88607688292791826d0f046b0e527a480ef50ab3'
  }, {
    address: '0xc257274276a4e539741ca11b590b9447b26a8051'
  }, {
    address: '0xc257274276a4e539741ca11b590b9447b26a8051'
  }],
};

function leaderboardReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LEADERBOARD:
      return { ...state, leaderboard: action.leaderboard };
    default:
      return state;
  }
}

export default leaderboardReducer;
