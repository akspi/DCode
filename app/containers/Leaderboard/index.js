import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import Leaderboard from './Leaderboard';
import injectReducer from '../../utils/injectReducer';
import { fetchLeaderboard } from './actions';

const mapDispatchToProps = (dispatch) => ({
  fetchLeaderboard: (contestId) => dispatch(fetchLeaderboard(contestId))
});

const mapStateToProps = (state) => ({
  leaderboard: state.leaderboard.leaderboard
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'leaderboard', reducer });

export default compose(withReducer, withConnect)(Leaderboard);
export { mapDispatchToProps };
