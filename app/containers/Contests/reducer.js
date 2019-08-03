import { UPDATE_CONTESTS, UPDATE_ERROR_MESSAGE, UPDATE_IS_LOADING } from './actions';

// The initial state of the App
const initialState = {
  contests: [],
  isLoading: false,
  errorMessage: ''
};

function contestsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONTESTS:
      return { ...state, contests: action.contests };
    case UPDATE_ERROR_MESSAGE: {
      return { ...state, contests: action.msg };
    }
    case UPDATE_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}

export default contestsReducer;
