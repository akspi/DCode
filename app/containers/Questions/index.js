import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import saga from './saga';
import Questions from './Questions';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { fetchQuestions } from './actions';

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (contestId) => dispatch(fetchQuestions(contestId))
});

const mapStateToProps = (state) => ({
  questions: state.questions.questions
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'questions', reducer });
const withSaga = injectSaga({ key: 'questions', saga });

export default compose(withReducer, withSaga, withConnect)(Questions);
export { mapDispatchToProps };
