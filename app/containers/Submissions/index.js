import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import Submissions from './Submissions';
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

export default compose(withReducer, withConnect)(Submissions);
export { mapDispatchToProps };
