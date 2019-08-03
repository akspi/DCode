import { UPDATE_SUBMISSIONS } from './actions';

// The initial state of the App
const initialState = {
  submissions: [{
    submissionTime: '21/3/19 19:02',
    problemName: 'DIY Wooden Ladder',
    verdict: false
  }, {
    submissionTime: '21/3/19 19:06',
    problemName: 'DIY Wooden Ladder',
    verdict: false
  }, {
    submissionTime: '21/3/19 19:15',
    problemName: 'DIY Wooden Ladder',
    verdict: true
  }, {
    submissionTime: '21/3/19 19:45',
    problemName: 'Welfare State',
    verdict: false
  }, {
    submissionTime: '21/3/19 20:05',
    problemName: 'Welfare State'
  }],
};

function submissionsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SUBMISSIONS:
      return { ...state, questions: action.questions };
    default:
      return state;
  }
}

export default submissionsReducer;
