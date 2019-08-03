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
      open: true
    };
  }

  componentDidMount() {
    const { fetchQuestions, match } = this.props;
    fetchQuestions(match.params.contestId);
  }

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  render() {
    const { classes, questions, isLoading } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={this.setOpen} isDrawerOpen={open} title={'Problems'} />
        <NavigationDrawer isDrawerOpen={open} setIsDrawerOpen={this.setOpen} />
        <QuestionList isOpen={open} questions={questions} isLoading={isLoading} />
      </div>
    );
  }
}

Questions.propTypes = {
  fetchQuestions: PropTypes.func,
  classes: PropTypes.any,
  questions: PropTypes.array,
  match: PropTypes.any,
  isLoading: PropTypes.bool
};

export default withStyles(styles)(Questions);
