import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header';
import NavigationDrawer from '../../components/NavigationDrawer';
import LeaderboardList from '../../components/LeaderboardList';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  componentDidMount() {
    const { fetchLeaderboard, match } = this.props;
    fetchLeaderboard(match.params.contestId);
  }

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  render() {
    const { classes, leaderboard } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={this.setOpen} isDrawerOpen={open} title={'Leaderboard'} />
        <NavigationDrawer isDrawerOpen={open} setIsDrawerOpen={this.setOpen} />
        <LeaderboardList isOpen={open} leaderboard={leaderboard} />
      </div>
    );
  }
}

Leaderboard.propTypes = {
  fetchLeaderboard: PropTypes.func,
  classes: PropTypes.any,
  leaderboard: PropTypes.array,
  match: PropTypes.any
};

export default withStyles(styles)(Leaderboard);
