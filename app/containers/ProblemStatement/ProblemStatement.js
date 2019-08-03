import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header';
import NavigationDrawer from '../../components/NavigationDrawer';
import Problem from '../../components/Problem';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

class ProblemStatement extends Component {
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
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={this.setOpen} isDrawerOpen={open} title={''} />
        <NavigationDrawer isDrawerOpen={open} setIsDrawerOpen={this.setOpen} />
        <Problem isOpen={open} />
      </div>
    );
  }
}

ProblemStatement.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(ProblemStatement);
