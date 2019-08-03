import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header';
import NavigationDrawer from '../../components/NavigationDrawer';
import SubmissionList from '../../components/SubmissionList';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

class Submissions extends Component {
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

  render() {
    const { classes, submissions } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={this.setOpen} isDrawerOpen={open} title={'My Submissions'} />
        <NavigationDrawer isDrawerOpen={open} setIsDrawerOpen={this.setOpen} />
        <SubmissionList isOpen={open} submissions={submissions} />
      </div>
    );
  }
}

Submissions.propTypes = {
  classes: PropTypes.any,
  submissions: PropTypes.array,
};

export default withStyles(styles)(Submissions);
