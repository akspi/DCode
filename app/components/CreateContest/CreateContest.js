import React, { Component } from 'react';
import {
  FormGroup, withStyles
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Problem from './Problem';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(10),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

class CreateContest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestName: '',
      problems: []
    };
  }

  updateContestName = (event) => {
    this.setState({
      contestName: event.target.value
    });
  };

  addProblem = () => {
    const { problems } = this.state;
    problems.push({
      problemStatement: '',
      input: '',
      output: ''
    });
    this.setState({
      problems
    });
  };

  changeProblem = (problem, index) => {
    const { problems } = this.state;
    problems[index] = problem;
    this.setState({
      problems
    });
  };

  submitContest = () => {
    const { create } = this.props;
    console.log(this.state);
    const { contestName, problems } = this.state;
    create(contestName, problems);
  };

  render() {
    const { classes } = this.props;
    const { contestName, problems } = this.state;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar}>
          <FormGroup>
            <TextField
              id="standard-name"
              label="Contest Name"
              className={classes.textField}
              value={contestName}
              onChange={this.updateContestName}
              margin="normal"
            />
          </FormGroup>
          {problems.map((problem, index) => (
            <Problem index={index} problem={problem} changeProblem={(problem) => this.changeProblem(index, problem)} />
          ))}
          <FormGroup>
            <div>
              <Button variant="contained" color="secondary" component="span" style={{margin: 20, marginLeft: 0}} onClick={() => this.addProblem()} className={classes.button}>
            + Add Problem
              </Button>
            </div>
          </FormGroup>
          <FormGroup>
            <Button variant="contained" color="primary" component="span" style={{margin: 20}} onClick={this.submitContest} className={classes.button}>
                Add Contest
            </Button>
          </FormGroup>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(CreateContest);
