import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../../components/Header';
import NavigationDrawer from '../../components/NavigationDrawer';
import QuestionList from '../../components/QuestionList';
import Editor from '../../components/Editor/Editor';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

export default function SubmitCode() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header setIsDrawerOpen={setOpen} isDrawerOpen />
      <NavigationDrawer isDrawerOpen setIsDrawerOpen={setOpen} />
      <Editor />
    </div>
  );
}
