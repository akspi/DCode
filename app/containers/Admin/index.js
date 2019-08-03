import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import Admin from './Admin';
import injectReducer from '../../utils/injectReducer';
import { addProblem, createContest } from './actions';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';

const mapDispatchToProps = (dispatch) => ({
  createContest: (contestName) => dispatch(createContest(contestName)),
  addProblem: (problemStatement, input, output) => dispatch(addProblem(problemStatement, input, output))
});

const mapStateToProps = (state) => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'admin', saga });

const withReducer = injectReducer({ key: 'admin', reducer });

export default compose(withReducer, withSaga, withConnect)(Admin);
export { mapDispatchToProps };
