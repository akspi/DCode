import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import Submissions from './Submissions';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { fetchSubmissions } from './actions';

const mapDispatchToProps = (dispatch) => ({
  fetchSubmissions: (contestId) => dispatch(fetchSubmissions(contestId))
});

const mapStateToProps = (state) => ({
  submissions: state.submissions.submissions
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'submissions', reducer });
const withSaga = injectSaga({ key: 'submissions', saga });

export default compose(withReducer, withSaga, withConnect)(Submissions);
export { mapDispatchToProps };
