import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import Contests from './Contests';
import injectReducer from '../../utils/injectReducer';
import { fetchContests, registerContest } from './actions';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';

const mapDispatchToProps = (dispatch) => ({
  fetchContests: () => dispatch(fetchContests()),
  registerContest: (contestId) => dispatch(registerContest(contestId))
});

const mapStateToProps = (state) => ({
  contests: state.contests.contests,
  isLoading: state.contests.isLoading
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'contests', saga });

const withReducer = injectReducer({ key: 'contests', reducer });

export default compose(withReducer, withSaga, withConnect)(Contests);
export { mapDispatchToProps };
