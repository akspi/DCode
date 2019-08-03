import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import { fetchQuestions, submitCode } from './actions';
import SubmitCode from './SubmitCode';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (contestId) => dispatch(fetchQuestions(contestId)),
  submitCode: (contestId, problemId, code) => dispatch(submitCode(contestId, problemId, code))
});

const mapStateToProps = (state) => ({
  questions: state.submitCode.questions
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'submitCode', saga });

const withReducer = injectReducer({ key: 'submitCode', reducer });

export default compose(withReducer, withSaga, withConnect)(SubmitCode);
export { mapDispatchToProps };
