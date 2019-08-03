import { UPDATE_QUESTIONS } from './actions';

// The initial state of the App
const initialState = {
  questions: [{
    id: 1,
    name: 'DIY Wooden Ladder\t\n',
    solved: true
  }, {
    id: 2,
    name: 'Welfare State\t\n',
    solved: true
  }, {
    id: 3,
    name: 'Tokitsukaze and Strange Rectangle\t\n',
    solved: false
  }, {
    id: 4,
    name: 'Keanu Reeves\t\n',
    solved: false
  }, {
    id: 5,
    name: 'Vus the Cossack and a Contest\t\n',
    solved: false
  }],
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
