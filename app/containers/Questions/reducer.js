import { UPDATE_QUESTIONS } from './actions';

// The initial state of the App
const initialState = {
  questions: [],
  errorMessage: ''
};

function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUESTIONS:
      return { ...state, questions: action.questions };
    default:
      return state;
  }
}

export default questionsReducer;
