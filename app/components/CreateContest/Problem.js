import React from 'react';
import { DialogTitle, FormGroup } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import * as PropTypes from 'prop-types';

export default function Problem(props) {
  const { problem, changeProblem, index } = props;
  const { problemStatement, input, output } = problem;
  return (
    <FormGroup>
      <DialogTitle style={{ paddingLeft: 0 }}>Problem #{index + 1}</DialogTitle>
      <TextField
        id="outlined-multiline-static"
        label="Problem Statement"
        multiline
        rows="4"
        defaultValue="Enter Problem Statement Here"
        value={problemStatement}
        onChange={(e) => {
          console.log(e.target.value);
          changeProblem({
            ...problem,
            problemStatement: e.target.value
          });
        }}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        label="Input"
        multiline
        rows="4"
        defaultValue="Input"
        value={input}
        onChange={(e) => {
          changeProblem({
            ...problem,
            input: e.target.value
          });
        }}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        label="Output"
        multiline
        rows="4"
        defaultValue="Output"
        value={output}
        onChange={(e) => {
          changeProblem({
            ...problem,
            output: e.target.value
          });
        }}
        margin="normal"
        variant="outlined"
      />
      <Divider />
    </FormGroup>
  );
}

Problem.propTypes = {
  problem: PropTypes.object,
  changeProblem: PropTypes.func,
  index: PropTypes.number
};
