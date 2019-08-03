import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header';
import NavigationDrawer from '../../components/NavigationDrawer';
import Editor from '../../components/Editor/Editor';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

class SubmitCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      code: '',
      selectedProblem: -1
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

  setCode = (value) => {
    this.setState({
      code: value
    });
  };

  setSelectedProblem = (value) => {
    this.setState({
      selectedProblem: value
    });
  };

  submitProblem = () => {
    const { selectedProblem, code } = this.state;
    const { submitCode, match } = this.props;

    if (selectedProblem !== -1) {
      submitCode(match.params.contestId, selectedProblem - 1, code);
    }
  };

  render() {
    const { code, selectedProblem } = this.state;
    const {
      classes, questions
    } = this.props;
    console.log(this.state, this.props);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={this.setOpen} isDrawerOpen title={'Submit Code'} />
        <NavigationDrawer isDrawerOpen setIsDrawerOpen={this.setOpen} />
        <Editor
          code={code}
          setCode={this.setCode}
          questions={questions}
          selectedProblem={selectedProblem}
          changeSelectedProblem={this.setSelectedProblem}
          onSubmit={this.submitProblem}
        />
      </div>
    );
  }
}

SubmitCode.propTypes = {
  questions: PropTypes.array,
  fetchQuestions: PropTypes.func,
  classes: PropTypes.any,
  submitCode: PropTypes.func
};

const SubmitCodeStyles = withStyles(styles)(SubmitCode);
export default withRouter(SubmitCodeStyles);
