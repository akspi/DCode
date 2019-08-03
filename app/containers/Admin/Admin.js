import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header';
import NavigationDrawer from '../../components/NavigationDrawer';
import CreateContest from '../../components/CreateContest/CreateContest';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  createContest = (contestName, problems) => {
    const { createContest } = this.props;
    createContest(contestName, problems);
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={this.setOpen} isDrawerOpen={open} title={'Create Contest'} />
        <NavigationDrawer isDrawerOpen={open} setIsDrawerOpen={this.setOpen} />
        <CreateContest isOpen={open} create={(contestName, problems) => this.createContest(contestName, problems)} />
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.any,
  createContest: PropTypes.func
};

export default withStyles(styles)(Admin);
