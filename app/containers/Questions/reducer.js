import { UPDATE_IS_LOADING, UPDATE_QUESTIONS } from './actions';

// The initial state of the App
const initialState = {
  questions: [],
  errorMessage: '',
  isLoading: false
};

function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUESTIONS:
      return { ...state, questions: action.questions };
    case UPDATE_IS_LOADING:
      return { ...state, isLoading: action.isLoading};
    default:
      return state;
  }
}

export default questionsReducer;
