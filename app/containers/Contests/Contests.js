import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header';
import ContestList from '../../components/ContestList';
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

class Contests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  componentDidMount() {
    const { fetchContests } = this.props;
    fetchContests();
  }

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  render() {
    const {
      classes, contests, registerContest, history
    } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={this.setOpen} isDrawerOpen={open} title={'Contests'} />
        <NavigationDrawer isDrawerOpen={open} setIsDrawerOpen={this.setOpen} />
        <ContestList
          isOpen
          contests={contests}
          onClick={(contestId) => { history.push(`/${contestId}/problems`); }}
          registerContest={registerContest}
        />
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
