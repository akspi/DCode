import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header';
import NavigationDrawer from '../../components/NavigationDrawer';
import QuestionList from '../../components/QuestionList';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  render() {
    const { classes, questions } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={this.setOpen} isDrawerOpen={open} />
        <NavigationDrawer isDrawerOpen={open} setIsDrawerOpen={this.setOpen} />
        <QuestionList isOpen={open} questions={questions} />
      </div>
    );
  }
}

Questions.propTypes = {
  fetchQuestions: PropTypes.func,
  classes: PropTypes.any,
  questions: PropTypes.array
};

export default withStyles(styles)(Questions);
