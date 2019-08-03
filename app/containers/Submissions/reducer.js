import { UPDATE_SUBMISSIONS } from './actions';

// The initial state of the App
const initialState = {
  submissions: [],
};

function submissionsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SUBMISSIONS:
      return { ...state, submissions: action.submissions };
    default:
      return state;
  }
}

export default submissionsReducer;
