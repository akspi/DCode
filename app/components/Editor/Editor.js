import React, { useState } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import * as PropTypes from 'prop-types';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

export default function Editor(props) {
  const classes = useStyles();
  const [fileName, setFileName] = useState('');
  const {
    code, setCode, questions, changeSelectedProblem, selectedProblem, onSubmit
  } = props;
  let fileUpload = null;

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: true,
      })}
    >
      <div className={classes.drawerHeader} />
      <AceEditor
        width={'100%'}
        mode="c_cpp"
        theme="monokai"
        name="Div"
        fontSize={15}
        value={code}
        onChange={setCode}
        editorProps={{ $blockScrolling: true }}
      />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Select
            value={selectedProblem}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
            onChange={(evt) => changeSelectedProblem(evt.target.value)}
          >
            <MenuItem value={-1} disabled>Select the problem</MenuItem>
            {questions.map((question) => <MenuItem value={question.id}>{question.name}</MenuItem>)}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <input
            onChange={() => {
              readFileContent(fileUpload.files[0]).then((content) => {
                setCode(content);
              });
              setFileName(fileUpload.files[0].name);
            }}
            ref={(ref) => { fileUpload = ref; }}
            accept=".cpp"
            className={classes.input}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="secondary" component="span" style={{ float: 'right' }} className={classes.button}>
              Upload Code
            </Button>
          </label>
          <span style={{ padding: '5px 20px', float: 'right' }}>{fileName}</span>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12} />
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Button variant="contained" color="primary" className={classes.button} onClick={onSubmit}>
            Submit Code
          </Button>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12} />
      </Grid>
    </main>
  );
}

Editor.propTypes = {
  code: PropTypes.string,
  setCode: PropTypes.func,
  questions: PropTypes.array,
  selectedProblem: PropTypes.number,
  changeSelectedProblem: PropTypes.func,
  onSubmit: PropTypes.func
};
