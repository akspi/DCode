import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header';
import ContestList from '../../components/ContestList';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

class Contests extends Component {
  componentDidMount() {
    const { fetchContests } = this.props;
    fetchContests();
  }

  render() {
    const {
      classes, contests, registerContest, history
    } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={() => {}} isDrawerOpen={false} title={'Contests'} />
        <ContestList isOpen contests={contests} onClick={(contestId) => { history.push(`/${contestId}/problems`); }} registerContest={registerContest} />
      </div>
    );
  }
}

Contests.propTypes = {
  fetchContests: PropTypes.func,
  classes: PropTypes.any,
  contests: PropTypes.array,
  registerContest: PropTypes.func,
  history: PropTypes.any
};

export default withStyles(styles)(Contests);
