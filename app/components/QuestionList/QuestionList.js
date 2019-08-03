import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { Done } from '@material-ui/icons';
import * as PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  root: {
    width: '100%',
    marginTop: theme.spacing(10),
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function createData(problemNumber, problemName, solved) {
  return {
    problemNumber, problemName, solved
  };
}

function QuestionList(props) {
  const classes = useStyles();
  const {
    isOpen, questions, history, location
  } = props;

  const rows = questions.map((question) => createData(question.id, question.name, question.solved));

  return (
    <Paper
      className={clsx(classes.content, classes.root, {
        [classes.contentShift]: isOpen,
      })}
    >
      <Table className={classes.table}>
        <colgroup>
          <col width="20%" />
          <col width="70%" />
          <col width="10%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell align="left">No.</TableCell>
            <TableCell align="left">Problem Name</TableCell>
            <TableCell align="right">Solved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} hover style={{ cursor: 'pointer' }} onClick={() => { history.push(`${location.pathname}/${row.problemNumber - 1}`); }}>
              <TableCell align="left">{row.problemNumber}</TableCell>
              <TableCell align="left">{row.problemName}</TableCell>
              <TableCell align="right">{row.solved ? <Done /> : ''}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

QuestionList.propTypes = {
  isOpen: PropTypes.bool,
  questions: PropTypes.array
};

export default withRouter(QuestionList);
