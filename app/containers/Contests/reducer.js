import { UPDATE_CONTESTS } from './actions';

// The initial state of the App
const initialState = {
  contests: [{
    id: 1,
    name: 'DCode Round #1\t\n',
    date: '03/07/19',
    participants: 10,
    registered: false
  }, {
    id: 2,
    name: 'DCode Round #2\t\n',
    date: '03/07/19',
    participants: 15,
    registered: true
  }]
};

function contestsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONTESTS:
      return { ...state, contests: action.contests };
    default:
      return state;
  }
}

export default contestsReducer;
