import { UPDATE_QUESTIONS } from './actions';

const initialState = {
  questions: []
};

function submitCodeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUESTIONS:
      return { ...state, questions: action.questions };
    default:
      return state;
  }
}

export default submitCodeReducer;
