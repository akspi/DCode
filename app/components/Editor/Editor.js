import React, { useState } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/c_cpp';
import 'brace/theme/monokai';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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

export default function Editor() {
  const classes = useStyles();
  const [fileName, setFileName] = useState('');
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
        editorProps={{ $blockScrolling: true }}
      />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Select
            value={0}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value={0} disabled>Select the problem</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <input
            onChange={() => {
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
            <Button variant="contained" color="secondary" component="span" className={classes.button}>
              Upload Code
            </Button>
          </label>
          <span style={{ padding: '5px 20px' }}>{fileName}</span>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12} />
        <Grid
          item
          xs={12}
          alignContent={'center'}
        >
          <Button variant="contained" color="primary" className={classes.button}>
            Submit Code
          </Button>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12} />
      </Grid>
    </main>
  );
}
